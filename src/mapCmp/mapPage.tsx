import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import type { Schema } from "../../amplify/data/resource";

// Mapbox アクセストークン
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapWithPinForm() {
  // ---- Refs ----
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const currentMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const savedMarkersRef = useRef<mapboxgl.Marker[]>([]); // 登録済みマーカーを保持

  // ---- State ----
  const [name, setName] = useState("現在地");
  const [desc, setDesc] = useState("現在の地点");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [locations, setLocations] = useState<Schema["Location"]["type"][]>([]);

  const client = generateClient<Schema>({ authMode: "identityPool" });

  /** 登録済み地点を取得 */
  const fetchLocations = async () => {
    try {
      const res = await client.models.Location.list();
      setLocations(res.data || []);
    } catch (err) {
      console.error("地点取得エラー:", err);
    }
  };

  // 初回に取得
  useEffect(() => {
    fetchLocations();
  }, []);

  /** 現在地を取得 */
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("現在地取得がサポートされていません");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
      },
      (err) => {
        console.error("位置情報取得エラー:", err);
        setLat(35.6895); // 東京駅 fallback
        setLng(139.6917);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  /** Map 初期化（マウント時のみ） */
  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng ?? 139.6917, lat ?? 35.6895],
      zoom: 12,
    });
    mapRef.current = map;

    // 現在地マーカー
    const marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat([lng ?? 139.6917, lat ?? 35.6895])
      .addTo(map);
    currentMarkerRef.current = marker;

    // ドラッグで位置更新
    marker.on("dragend", () => {
      const lngLat = marker.getLngLat();
      setLat(lngLat.lat);
      setLng(lngLat.lng);
    });

    // 地図クリックで現在地マーカー移動
    map.on("click", (e) => {
      marker.setLngLat(e.lngLat);
      setLat(e.lngLat.lat);
      setLng(e.lngLat.lng);
    });

    return () => map.remove();
  }, []);

  /** 登録済み地点を地図に描画 */
  useEffect(() => {
    if (!mapRef.current) return;

    // 古いマーカーを削除
    savedMarkersRef.current.forEach((m) => m.remove());
    savedMarkersRef.current = [];

    locations.forEach((loc) => {
      if (loc.latitude != null && loc.longitude != null) {
        const m = new mapboxgl.Marker({ color: "red" })
          .setLngLat([loc.longitude, loc.latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setText(
              `${loc.name || ""}\n${loc.description || ""}`
            )
          )
          .addTo(mapRef.current!);
        savedMarkersRef.current.push(m);
      }
    });
  }, [locations]);

  /** 現在地に戻る */
  const moveToCurrentLocation = () => {
    if (!mapRef.current || !currentMarkerRef.current) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLat(latitude);
        setLng(longitude);
        mapRef.current!.flyTo({ center: [longitude, latitude], zoom: 14 });
        currentMarkerRef.current!.setLngLat([longitude, latitude]);
      },
      (err) => alert("現在地を取得できません: " + err.message),
      { enableHighAccuracy: true }
    );
  };

  /** 地点登録 */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lat == null || lng == null) return;

    try {
      const res = await client.models.Location.create({
        name,
        description: desc || undefined,
        latitude: lat,
        longitude: lng,
      });

      if (res.errors) {
        alert("登録失敗: " + JSON.stringify(res.errors));
        return;
      }

      alert("登録しました！");
      setName("");
      setDesc("");
      fetchLocations(); // 更新
    } catch (err) {
      console.error("登録エラー:", err);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100vw",
          position: "relative",
        }}
      >
        {/* Map */}
        <div ref={mapContainer} style={{ flex: 1 }} />

        {/* ログアウトボタンをその下に配置 */}
        <Authenticator>
          {({ signOut }) => (
            <button
              onClick={signOut}
              style={{
                position: "absolute",
                top: 10, 
                right: 10,
                zIndex: 2,
                padding: "8px 12px",
                background: "white",
                border: "1px solid #ccc",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              ログアウト
            </button>
          )}
        </Authenticator>

        {/* 現在地に戻るボタン */}
        <button
          onClick={moveToCurrentLocation}
          style={{
            position: "absolute",
            top: 55,
            right: 10,
            zIndex: 2,
            padding: "8px 12px",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          現在地
        </button>

         {/* ＋ボタン（フォーム開閉用） */}
        <button
          onClick={() => setShowForm(true)}
          style={{
            position: "absolute",
            top: 100,
            right: 10,
            zIndex: 2,
            width: "40px",
            height: "40px",
            borderRadius: "40%",
            background: "#007bff",
            color: "white",
            fontSize: "10px",
            border: "none",
            cursor: "pointer",
          }}
        >
          ✙
        </button>

        {/* サイドフォーム（右側にスライドイン） */}
        {showForm && (
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "300px",
              height: "100%",
              background: "white",
              boxShadow: "-2px 0 8px rgba(0,0,0,0.2)",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              zIndex: 3,
            }}
          >
            {/* 閉じるボタン */}
            <button
              onClick={() => setShowForm(false)}
              style={{
                alignSelf: "flex-end",
                border: "none",
                background: "transparent",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
            ×
            </button>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <input
                placeholder="地点名"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                placeholder="説明"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <button type="submit">登録</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
