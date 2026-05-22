import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import type React from "react";

type Props = {
  onSearchOpen: () => void;
  hasSearchFilter: boolean;
  onClearSearch: () => void;
};

export default function MapHeader({ onSearchOpen, hasSearchFilter, onClearSearch }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { signOut } = useAuthenticator();

  return (
    <>
      {/* 全体表示ピル（フィルター中のみ） */}
      {hasSearchFilter && (
        <button
          onClick={onClearSearch}
          style={{
            position: "absolute",
            top: "calc(16px + env(safe-area-inset-top, 0px))",
            left: 16,
            zIndex: 4,
            background: "white",
            border: "none",
            borderRadius: 20,
            padding: "8px 14px",
            fontSize: 13,
            fontWeight: 600,
            color: "#333",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            cursor: "pointer",
          }}
        >
          ✕ 全体表示
        </button>
      )}

      {/* 右上フローティングボタン群 */}
      <div
        style={{
          position: "absolute",
          top: "calc(16px + env(safe-area-inset-top, 0px))",
          right: 16,
          zIndex: 4,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <button onClick={onSearchOpen} style={floatBtn}>
          🔍
        </button>
        <button onClick={() => setMenuOpen((o) => !o)} style={floatBtn}>
          👤
        </button>
      </div>

      {/* メニュー背景オーバーレイ */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{ position: "absolute", inset: 0, zIndex: 9 }}
        />
      )}

      {/* ドロップダウンメニュー */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(108px + env(safe-area-inset-top, 0px))",
            right: 16,
            background: "white",
            borderRadius: 12,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            overflow: "hidden",
            zIndex: 10,
            minWidth: 160,
          }}
        >
          <button
            style={menuItemStyle}
            onClick={() => { navigate("/settings"); setMenuOpen(false); }}
          >
            ⚙️ ユーザー設定
          </button>
          <div style={{ height: 1, background: "#f0f0f0" }} />
          <button
            style={{ ...menuItemStyle, color: "#e74c3c" }}
            onClick={() => { signOut(); setMenuOpen(false); }}
          >
            ログアウト
          </button>
        </div>
      )}
    </>
  );
}

const floatBtn: React.CSSProperties = {
  width: 44,
  height: 44,
  borderRadius: "50%",
  background: "white",
  border: "none",
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  fontSize: 20,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const menuItemStyle: React.CSSProperties = {
  width: "100%",
  textAlign: "left",
  padding: "14px 16px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: 15,
  color: "#333",
};
