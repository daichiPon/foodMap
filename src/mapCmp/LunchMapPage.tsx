import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";
import type { Schema } from "../../amplify/data/resource";
import { LunchSideForm } from "./Lunch/SideForm";
import LunchSearchSideForm from "./Lunch/SearchForm";

mapboxgl.accessToken = import.meta.env.VITE_LUNCH_MAPBOX_TOKEN;

const client = generateClient<Schema>({ authMode: "identityPool" });

export default function LunchMapPage({ userId }: { userId: string }) {
  // ---- Refs ----
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const currentMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const savedMarkersRef = useRef<mapboxgl.Marker[]>([]); // 登録済みマーカーを保持

  // ---- State ----
  const [lat, setLat] = useState<number>(34.702331);
  const [lng, setLng] = useState<number>(135.496025);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [locations, setLocations] = useState<Schema["Location"]["type"][]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Schema["Location"]["type"] | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  //検索用
  const [searchForm, setSearchForm] = useState<boolean>(false);
  const [displayLocations, setDisplayLocations] = useState<Schema["Location"]["type"][]>([]);

  const navigate = useNavigate();
  const { signOut } = useAuthenticator();
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
      () => {
        setLat(34.702331);
        setLng(135.496025);
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
      center: [lng ?? 135.496025, lat ?? 34.702331],
      zoom: 12,
    });
    mapRef.current = map;

    // 現在地マーカー
    const marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat([lng ?? 135.496025, lat ?? 34.702331])
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

  /** 登録済み地点 or 検索結果を地図に描画 */
  useEffect(() => {
    if (!mapRef.current) return;

    savedMarkersRef.current.forEach((m) => m.remove());
    savedMarkersRef.current = [];

    const targets = displayLocations.length > 0 ? displayLocations : locations;

    targets.forEach((loc) => {
      if (loc.latitude != null && loc.longitude != null) {
        const m = new mapboxgl.Marker({ color: "red" })
          .setLngLat([loc.longitude, loc.latitude])
          .addTo(mapRef.current!);

        m.getElement().addEventListener("click", () => {
          setSelectedLocation(loc);
        });

        savedMarkersRef.current.push(m);
      }
    });
  }, [locations, displayLocations]);

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

  const handleSearchChange = (_values: string) => {};

  const iconButton: React.CSSProperties = {
    background: "transparent",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
  };

  const bottomBtn: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    color: "#333",
  };

  const circleIcon: React.CSSProperties = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#f2f2f2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "4px",
    fontSize: "20px",
  };
  const menuItem: React.CSSProperties = {
    width: "100%",
    textAlign: "left",
    padding: "10px 16px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        {/* === 地図 === */}
        <div ref={mapContainer} style={{ height: "100%", width: "100%" }} />

        {/* === 上部ヘッダー === */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: "5%",
            right: "5%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 12px",
            background: "rgba(255, 255, 255, 0.4)",
            borderRadius: "14px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            backdropFilter: "blur(8px)",
            zIndex: 3,
          }}
        >
          {/* ハンバーガーボタン */}
          <button onClick={() => setMenuOpen((o) => !o)} style={iconButton}>
            ☰
          </button>

          {/* 右端ボタン（例：ログアウトなど） */}
          {menuOpen && (
            <div
              style={{
                position: "absolute",
                top: "60px", // ハンバーガーの下に表示
                left: "10px",
                background: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                padding: "8px 0",
                minWidth: "150px",
                zIndex: 10,
              }}
            >
              <button style={bottomBtn} onClick={() => setSearchForm(true)}>
                <span>検索</span>
              </button>

              <button
                style={menuItem}
                onClick={() => {
                  navigate("/settings");
                  setMenuOpen(false);
                }}
              >
                ユーザー設定
              </button>

              <button
                style={menuItem}
                onClick={() => signOut()}
              >
                ログアウト
              </button>
            </div>
          )}
          {/* 全体表示に戻すボタン */}
          {displayLocations.length > 0 && (
            <button
              onClick={() => setDisplayLocations([])}
              style={{
                background: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              全体表示
            </button>
          )}
        </div>

        {/* === 下部ツールバー === */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: "10%",
            right: "10%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "10px 0",
            background: "rgba(255, 255, 255, 0.4)",
            borderRadius: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            backdropFilter: "blur(8px)",
            zIndex: 3,
          }}
        >
          {/* 登録 */}
          <button style={bottomBtn} onClick={() => setShowForm(true)}>
            <div style={circleIcon}>＋</div>
            <span>登録</span>
          </button>

          {/* 検索 */}
          <button style={bottomBtn} onClick={() => navigate("/night")}>
            <div style={circleIcon}>👤</div>
            <span>自分</span>
          </button>

          {/* 現在地 */}
          <button style={bottomBtn} onClick={moveToCurrentLocation}>
            <div style={circleIcon}>▲</div>
            <span>現在地</span>
          </button>
        </div>
        {showForm && (
          <LunchSideForm
            lat={lat}
            lng={lng}
            userId={userId}
            onClose={() => setShowForm(false)}
            onRegisterComplete={(newLoc) => setLocations((prev) => [...prev, newLoc])}
          />
        )}

        {searchForm && (
          <LunchSearchSideForm
            onClose={() => setSearchForm(false)}
            onValuesChange={handleSearchChange}
            onSearchResult={(searchResult) => {
              setDisplayLocations(searchResult); // 検索結果のみ描画
            }}
          />
        )}

        {selectedLocation && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              background: "white",
              maxHeight: "50%",
              overflowY: "auto",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
              boxShadow: "0 -2px 8px rgba(0,0,0,0.2)",
              padding: "16px",
              zIndex: 4,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontWeight: "bold", color: "#000" }}>
                {selectedLocation.name || "無名地点"}{" "}
              </h2>
              <button
                style={{
                  fontSize: "20px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedLocation(null)}
              >
                ✕
              </button>
            </div>
            <p style={{ marginTop: "3px", color: "#000" }}>{selectedLocation.category}</p>
            <p style={{ marginTop: "3px", color: "#000" }}>{selectedLocation.priceRange}</p>
            <p style={{ marginTop: "3px", color: "#000" }}>{selectedLocation.description}</p>
            <p style={{ marginTop: "3px", color: "#000" }}>{selectedLocation.address}</p>
            {selectedLocation.imageUrl && (
              <img
                src={selectedLocation.imageUrl}
                alt={selectedLocation.name || "登録画像"}
                style={{
                  marginTop: "10px",
                  width: "90%",
                  maxHeight: "200px",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
