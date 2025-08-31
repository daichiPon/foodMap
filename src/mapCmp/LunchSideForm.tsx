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

export const LunchSideForm: React.FC<LunchSideFormProps> = (props) => {
  const { lat, lng, onClose, onRegisterComplete } = props;

  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>("");

  const categories = [
    "大衆居酒屋",
    "おしゃれ居酒屋",
    "和食",
    "洋食",
    "中華",
    "カフェ",
    "ファストフード",
  ];
  const priceRanges = ["¥0~¥1000", "¥1000~¥2000", "¥3000~¥4000", "¥4000~¥5000", "¥5000~ ∞ "];

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
        category,
        priceRange,
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
      setCategory("");
      setPriceRange("");
      onClose();
      alert("登録しました！");
    } catch (err) {
      console.error("登録エラー:", err);
      alert("登録中にエラーが発生しました");
    }
  };

  const inputStyle: React.CSSProperties = {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: "none", // デフォルト矢印を消す
    backgroundColor: "white",
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#87CEFA",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  const optionStyle: React.CSSProperties = {
    borderRadius: "8px",
    padding: "8px",
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
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#87CEFA")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
        />

        <input
          placeholder="説明"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#87CEFA")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={selectStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#87CEFA")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
        >
          <option value="" style={{ color: "#888" }}>
            カテゴリーを選択
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat} style={optionStyle}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          required
          style={selectStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#87CEFA")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
        >
          <option value="" style={{ color: "#888" }}>
            一人当たりの金額を選択
          </option>
          {priceRanges.map((pri) => (
            <option key={pri} value={pri} style={optionStyle}>
              {pri}
            </option>
          ))}
        </select>
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#00BFFF")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#87CEFA")}
        >
          登録
        </button>
      </form>
    </div>
  );
};
