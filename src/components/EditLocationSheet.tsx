import { useRef, useState } from "react";
import type React from "react";
import type { Schema } from "../../amplify/data/resource";
import { CATEGORIES, PRICE_RANGES } from "../constants/food";
import { updateLocation } from "../api/locations";
import { uploadImage } from "../api/storage";
import { CameraIcon } from "./icons";

type LocationType = Schema["Location"]["type"];

type Props = {
  location: LocationType;
  onClose: () => void;
  onSaved: (updated: LocationType) => void;
  onDelete: (location: LocationType) => void;
};

const fieldStyle: React.CSSProperties = {
  padding: "13px 14px",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--border)",
  background: "#f7f8fa",
  fontSize: "15px",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};

/** 投稿の編集・削除用ボトムシート */
export default function EditLocationSheet({ location, onClose, onSaved, onDelete }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(location.name || "");
  const [category, setCategory] = useState(location.category || "");
  const [priceRange, setPriceRange] = useState(location.priceRange || "");
  const [desc, setDesc] = useState(location.description || "");
  const [newFile, setNewFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const selectPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setNewFile(f);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let imageUrl: string | undefined = undefined;
      if (newFile) {
        imageUrl = await uploadImage(newFile);
      }

      const updated = await updateLocation({
        id: location.id,
        name,
        category: category || null,
        priceRange: priceRange || null,
        description: desc || null,
        ...(imageUrl ? { imageUrl } : {}),
      });

      if (updated) {
        onSaved(updated);
        onClose();
      } else {
        alert("保存に失敗しました");
      }
    } catch (err) {
      console.error("保存エラー:", err);
      alert("保存に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  const displayImage = preview || location.imageUrl;

  return (
    <>
      <div
        className="anim-fade-in"
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          zIndex: 30,
        }}
      />

      <div
        className="anim-slide-up"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          boxSizing: "border-box",
          background: "var(--surface)",
          borderTopLeftRadius: "22px",
          borderTopRightRadius: "22px",
          boxShadow: "0 -8px 32px rgba(0,0,0,0.18)",
          padding: "0 20px",
          paddingBottom: "max(env(safe-area-inset-bottom), 20px)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxHeight: "85dvh",
          overflowY: "auto",
          overscrollBehavior: "contain",
          zIndex: 31,
        }}
      >
        <div
          style={{
            width: "36px",
            height: "5px",
            borderRadius: "3px",
            background: "#d8dade",
            margin: "10px auto 2px",
            flexShrink: 0,
          }}
        />

        <h3 style={{ margin: "0 0 4px", fontSize: "17px", fontWeight: 700 }}>投稿を編集</h3>

        {/* 写真の変更 */}
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
            background: displayImage ? "transparent" : "#f7f8fa",
            border: displayImage ? "none" : "1.5px dashed #FFB3A0",
            padding: displayImage ? 0 : "28px 0",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            color: "var(--primary)",
            flexShrink: 0,
          }}
        >
          {displayImage ? (
            <>
              <img
                src={displayImage}
                alt="投稿画像"
                style={{
                  width: "100%",
                  maxHeight: "180px",
                  objectFit: "cover",
                  display: "block",
                  borderRadius: "var(--radius)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  right: "10px",
                  bottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  background: "rgba(0,0,0,0.6)",
                  color: "white",
                  borderRadius: "14px",
                  padding: "6px 12px",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                <CameraIcon size={14} strokeWidth={2.2} />
                写真を変更
              </span>
            </>
          ) : (
            <>
              <CameraIcon size={24} strokeWidth={1.8} />
              <span style={{ fontSize: "13px", fontWeight: 600 }}>写真を追加する</span>
            </>
          )}
        </button>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="店名"
          style={fieldStyle}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)} style={fieldStyle}>
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
          style={fieldStyle}
        >
          <option value="">一人当たりの金額を選択</option>
          {PRICE_RANGES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="簡単レビュー"
          rows={3}
          style={{ ...fieldStyle, resize: "vertical" }}
        />

        <button
          className="press"
          onClick={handleSave}
          disabled={saving || !name.trim()}
          style={{
            background: saving ? "#ccc" : "var(--primary-gradient)",
            color: "white",
            borderRadius: "14px",
            padding: "15px",
            fontSize: "16px",
            fontWeight: 700,
            boxShadow: saving ? "none" : "0 6px 16px rgba(255,107,107,0.4)",
            flexShrink: 0,
          }}
        >
          {saving ? "保存中..." : "保存する"}
        </button>

        <button
          className="press"
          onClick={() => onDelete(location)}
          style={{
            color: "#E53935",
            fontSize: "14px",
            fontWeight: 600,
            padding: "10px",
            flexShrink: 0,
          }}
        >
          この投稿を削除
        </button>
      </div>
    </>
  );
}
