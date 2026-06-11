import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { uploadImage } from "../api/storage";
import { CATEGORIES, PRICE_RANGES, HOTPEPPER_API_URL } from "../constants/food";
import PageHeader from "../components/PageHeader";
import MapPicker from "../components/MapPicker";
import { CameraIcon, PinIcon, MapIcon } from "../components/icons";

const client = generateClient<Schema>({ authMode: "userPool" });

const MAPBOX_TOKEN = import.meta.env.VITE_LUNCH_MAPBOX_TOKEN as string;

const inputStyle: React.CSSProperties = {
  padding: "14px 16px",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--border)",
  background: "var(--surface)",
  fontSize: "16px",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  boxShadow: "var(--shadow-card)",
};

export default function QuickRegisterPage({ userId }: { userId: string }) {
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [address, setAddress] = useState<string>("");
  const [locating, setLocating] = useState(false);
  const [shops, setShops] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [desc, setDesc] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showMapPicker, setShowMapPicker] = useState(false);

  /** 座標をセットして住所＋周辺店舗候補を取得 */
  const applyPosition = async (latitude: number, longitude: number) => {
    setLat(latitude);
    setLng(longitude);
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_TOKEN}&language=ja`;
      const res = await fetch(url);
      const data = await res.json();
      setAddress(data.features[0]?.place_name || "住所が見つかりません");
    } catch {
      setAddress("住所が見つかりません");
    }
    try {
      const res = await fetch(`${HOTPEPPER_API_URL}?lat=${latitude}&lng=${longitude}`);
      if (res.ok) {
        const data = await res.json();
        setShops(data.results.shop.map((s: { name: string }) => s.name));
      }
    } catch (err) {
      console.error("店舗情報取得エラー:", err);
    }
  };

  /** マップの「この場所を登録」から遷移してきた場合は座標を引き継ぐ */
  useEffect(() => {
    const state = routerLocation.state as { lat?: number; lng?: number } | null;
    if (state?.lat != null && state?.lng != null) {
      applyPosition(state.lat, state.lng);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("現在地取得がサポートされていません");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        await applyPosition(pos.coords.latitude, pos.coords.longitude);
        setLocating(false);
      },
      (err) => {
        alert("現在地を取得できません: " + err.message);
        setLocating(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lat == null || lng == null) {
      alert("「現在地を使う」または「地図から選ぶ」で位置を指定してください");
      return;
    }
    setSubmitting(true);
    try {
      let imageUrl: string | undefined = undefined;

      if (file) {
        imageUrl = await uploadImage(file);
      }

      const res = await client.models.Location.create({
        name,
        description: desc || undefined,
        latitude: lat,
        longitude: lng,
        address,
        category,
        priceRange,
        imageUrl,
        cognitoSub: userId,
      });

      if (res.errors || !res.data) {
        alert("登録に失敗しました");
        return;
      }

      alert("登録しました！");
      navigate("/timeline");
    } catch (err) {
      console.error("登録エラー:", err);
      alert("登録中にエラーが発生しました");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ paddingBottom: "24px" }}>
      <PageHeader title="クイック登録" />

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "480px",
          margin: "0 auto",
          padding: "4px 16px 0",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {/* 写真（最上部） */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={selectPhoto}
          style={{ display: "none" }}
        />
        <button
          type="button"
          className="press"
          onClick={() => fileInputRef.current?.click()}
          style={{
            borderRadius: "var(--radius)",
            background: preview ? "transparent" : "var(--surface)",
            border: preview ? "none" : "1.5px dashed #FFB3A0",
            padding: preview ? 0 : "36px 0",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            color: "var(--primary)",
            boxShadow: preview ? "var(--shadow-card)" : "none",
          }}
        >
          {preview ? (
            <img
              src={preview}
              alt="選択した写真"
              style={{
                width: "100%",
                maxHeight: "240px",
                objectFit: "cover",
                display: "block",
                borderRadius: "var(--radius)",
              }}
            />
          ) : (
            <>
              <CameraIcon size={28} strokeWidth={1.8} />
              <span style={{ fontSize: "14px", fontWeight: 600 }}>写真を撮る / 選択する</span>
            </>
          )}
        </button>

        {/* 位置の指定: 現在地 or 地図から選択 */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            type="button"
            className="press"
            onClick={useCurrentLocation}
            disabled={locating}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              background: "var(--primary-gradient)",
              color: "white",
              borderRadius: "var(--radius-sm)",
              padding: "14px 8px",
              fontSize: "14px",
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(255,107,107,0.35)",
            }}
          >
            <PinIcon size={16} strokeWidth={2.2} />
            {locating ? "取得中..." : "現在地を使う"}
          </button>
          <button
            type="button"
            className="press"
            onClick={() => setShowMapPicker((v) => !v)}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              background: showMapPicker ? "var(--text)" : "var(--surface)",
              color: showMapPicker ? "white" : "var(--text)",
              border: showMapPicker ? "none" : "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              padding: "14px 8px",
              fontSize: "14px",
              fontWeight: 600,
              boxShadow: "var(--shadow-card)",
            }}
          >
            <MapIcon size={16} strokeWidth={2.2} />
            地図から選ぶ
          </button>
        </div>

        {showMapPicker && (
          <MapPicker
            value={lat != null && lng != null ? { lat, lng } : null}
            onChange={(la, ln) => applyPosition(la, ln)}
          />
        )}

        {lat != null && (
          <div
            className="anim-fade-in"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "#E8F5E9",
              color: "#2E7D32",
              borderRadius: "var(--radius-sm)",
              padding: "11px 14px",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            ✅ {address || "位置セット済み"}
          </div>
        )}

        <input
          placeholder="店名を入力または選択"
          list="quick-shop-list"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />
        <datalist id="quick-shop-list">
          {shops.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={inputStyle}
        >
          <option value="">カテゴリーを選択</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          required
          style={inputStyle}
        >
          <option value="">一人当たりの金額を選択</option>
          {PRICE_RANGES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <textarea
          placeholder="簡単レビュー（例: 雰囲気よし、また行きたい！）"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
        />

        <button
          type="submit"
          className="press"
          disabled={submitting}
          style={{
            background: submitting ? "#ccc" : "var(--primary-gradient)",
            color: "white",
            borderRadius: "14px",
            padding: "16px",
            fontSize: "16px",
            fontWeight: 700,
            boxShadow: submitting ? "none" : "0 6px 16px rgba(255,107,107,0.4)",
          }}
        >
          {submitting ? "登録中..." : "登録する"}
        </button>
      </form>
    </div>
  );
}
