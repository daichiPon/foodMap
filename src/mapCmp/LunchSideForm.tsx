import React, { useState } from "react";
import mapboxgl from "mapbox-gl";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

type LunchSideFormProps = {
  lat: number | null;
  lng: number | null;
  onClose: () => void;
  onRegisterComplete: (newLocation: Schema["Location"]["type"]) => void;
};

export const LunchSideForm: React.FC<LunchSideFormProps> = ({
  lat,
  lng,
  onClose,
  onRegisterComplete,
}) => {
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const client = generateClient<Schema>({ authMode: "identityPool" });

  const getAddress = async (lng: number, lat: number) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}&language=ja`;
    const res = await fetch(url);
    const data = await res.json();
    return data.features[0]?.place_name || "住所が見つかりません";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lat == null || lng == null) {
      alert("位置情報が取得できていません");
      return;
    }

    const address = await getAddress(lng, lat);

    try {
      const res = await client.models.Location.create({
        name,
        description: desc || undefined,
        latitude: lat,
        longitude: lng,
        address,
      });

      if (res.errors) {
        alert("登録失敗: " + JSON.stringify(res.errors));
        return;
      }

      if (!res.data) {
        alert("登録に失敗しました");
        return;
      }

      // 登録完了を親に通知
      onRegisterComplete(res.data);

      // フォーム初期化・閉じる
      setName("");
      setDesc("");
      onClose();
      alert("登録しました！");
    } catch (err) {
      console.error("登録エラー:", err);
      alert("登録中にエラーが発生しました");
    }
  };

  return (
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
      <button
        onClick={onClose}
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

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        <input
          placeholder="地点名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input placeholder="説明" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button type="submit">登録</button>
      </form>
    </div>
  );
};
