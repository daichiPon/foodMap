import type { Schema } from "../../../amplify/data/resource";

type Props = {
  location: Schema["Location"]["type"];
  onClose: () => void;
};

export default function LocationBottomSheet({ location, onClose }: Props) {
  return (
    <>
      {/* 背景タップで閉じる */}
      <div
        className="anim-fade-in"
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.25)",
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
          maxHeight: "70dvh",
          overflowY: "auto",
          overscrollBehavior: "contain",
          borderTopLeftRadius: "22px",
          borderTopRightRadius: "22px",
          boxShadow: "0 -8px 32px rgba(0,0,0,0.18)",
          paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
          zIndex: 31,
        }}
      >
        {/* グラバー */}
        <div
          style={{
            width: "36px",
            height: "5px",
            borderRadius: "3px",
            background: "#d8dade",
            margin: "10px auto 6px",
          }}
        />

        {location.imageUrl && (
          <img
            src={location.imageUrl}
            alt={location.name || "登録画像"}
            style={{
              width: "calc(100% - 32px)",
              margin: "8px 16px 0",
              maxHeight: "200px",
              borderRadius: "16px",
              objectFit: "cover",
              display: "block",
            }}
          />
        )}

        <div style={{ padding: "12px 20px 8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 800, letterSpacing: "-0.01em" }}>
              {location.name || "無名地点"}
            </h2>
            <button
              className="press"
              onClick={onClose}
              aria-label="閉じる"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "#f0f1f4",
                color: "var(--text-sub)",
                fontSize: "15px",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "10px" }}>
            {location.category && (
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  background: "#FFF0EB",
                  color: "var(--primary)",
                  borderRadius: "12px",
                  padding: "4px 12px",
                }}
              >
                {location.category}
              </span>
            )}
            {location.priceRange && (
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  background: "#EEF4FB",
                  color: "#4A90D9",
                  borderRadius: "12px",
                  padding: "4px 12px",
                }}
              >
                {location.priceRange}
              </span>
            )}
          </div>

          {location.description && (
            <p style={{ margin: "12px 0 0", fontSize: "15px", color: "var(--text)" }}>
              {location.description}
            </p>
          )}
          {location.address && (
            <p style={{ margin: "10px 0 0", fontSize: "13px", color: "var(--text-sub)" }}>
              📍 {location.address}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
