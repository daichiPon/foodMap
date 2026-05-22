import { useNavigate, useLocation } from "react-router-dom";
import type React from "react";

type Props = {
  onRegister: () => void;
  onCurrentLocation: () => void;
};

export default function MapBottomToolbar({ onRegister, onCurrentLocation }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const isMyMap = location.pathname === "/night";

  return (
    <>
      {/* 現在地フローティングボタン */}
      <button
        onClick={onCurrentLocation}
        style={{
          position: "absolute",
          bottom: "calc(72px + env(safe-area-inset-bottom, 0px))",
          right: 16,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "white",
          border: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          fontSize: 20,
          cursor: "pointer",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        🎯
      </button>

      {/* ボトムタブバー */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          paddingBottom: "env(safe-area-inset-bottom, 8px)",
          paddingTop: 8,
          boxShadow: "0 -1px 0 rgba(0,0,0,0.08)",
          zIndex: 3,
        }}
      >
        <button onClick={() => navigate("/")} style={tabStyle(!isMyMap)}>
          <span style={{ fontSize: 22 }}>👥</span>
          <span>みんな</span>
        </button>

        {/* 登録 FAB */}
        <button
          onClick={onRegister}
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #87CEFA, #4db8f3)",
            border: "none",
            boxShadow: "0 4px 14px rgba(77,184,243,0.5)",
            fontSize: 28,
            cursor: "pointer",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 12,
            flexShrink: 0,
          }}
        >
          ＋
        </button>

        <button onClick={() => navigate("/night")} style={tabStyle(isMyMap)}>
          <span style={{ fontSize: 22 }}>👤</span>
          <span>マイマップ</span>
        </button>
      </div>
    </>
  );
}

const tabStyle = (active: boolean): React.CSSProperties => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: 11,
  color: active ? "#4db8f3" : "#aaa",
  flex: 1,
  padding: "4px 8px",
  fontWeight: active ? 600 : 400,
});
