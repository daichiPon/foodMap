import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { Authenticator ,useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from "../../amplify/data/resource";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapWithPinForm() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [name, setName] = useState("東京");
  const [desc, setDesc] = useState("東京の地点");
  const [lat, setLat] = useState(35.6895);
  const [lng, setLng] = useState(139.6917);
  const [locations, setLocations] = useState<Schema["Location"]["type"][]>([]);
  const client = generateClient<Schema>({authMode: 'identityPool'});

  // 登録済み地点取得
  const fetchLocations = async () => {
    try {
      const res = await client.models.Location.list();
      setLocations(res.data || []);
    } catch (err) {
      console.error("取得エラー:", err);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // Mapbox 初期化
  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: 5,
    });

    // 初期マーカー（ドラッグ可能）
    const marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat([lng, lat])
      .addTo(map);
    markerRef.current = marker;

    marker.on("dragend", () => {
      const lngLat = marker.getLngLat();
      setLat(lngLat.lat);
      setLng(lngLat.lng);
    });

    // クリックでマーカー移動
    map.on("click", (e) => {
      marker.setLngLat(e.lngLat);
      setLat(e.lngLat.lat);
      setLng(e.lngLat.lng);
    });

    // 登録済み地点マーカー
    locations.forEach((loc) => {
      if (loc.latitude != null && loc.longitude != null) {
        new mapboxgl.Marker()
          .setLngLat([loc.longitude, loc.latitude])
          .setPopup(new mapboxgl.Popup().setText(loc.name || ""))
          .addTo(map);
      }
    });

    return () => map.remove();
  }, [locations]);

  // 登録処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("登録データ:", { name, desc, lat, lng });
      const res = await client.models.Location.create({
        name,
        description: desc || undefined,
        latitude: lat,
        longitude: lng,
      });
      console.log("res",res)
      if (res.errors) {
      alert("登録失敗: " + JSON.stringify(res.errors));
      return;
    }
      alert("登録しました！");
      setName("");
      setDesc("");
      fetchLocations();
    } catch (err) {
      console.error("登録エラー:", err);
    }
  };

  //現在のログインuser
  function MyComponent() {
  const { user } = useAuthenticator((context) => [context.user]);
  console.log("user情報",user);
  return <div>ユーザID：{user?.username}</div>;
}

  return (
    <>
    <MyComponent/>
      <Authenticator>
        {({ signOut }) => (
          <div>
            <button onClick={signOut}>ログアウト</button>
          </div>
        )}
      </Authenticator>
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw"  }}>
      <div ref={mapContainer} style={{ flex: 1 }} />
      <form
        onSubmit={handleSubmit}
        style={{ padding: 10, display: "flex", flexDirection: "column", gap: 5 }}
      >
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
        <div>
          緯度: {lat.toFixed(5)}, 経度: {lng.toFixed(5)}
        </div>
        <button type="submit">登録</button>
      </form>
    </div>
    </>
  );
}
