export type MapFilterMode = "all" | "mine" | "friends";

type Props = {
  mode: MapFilterMode;
  onChange: (mode: MapFilterMode) => void;
};

const tabs: { mode: MapFilterMode; label: string }[] = [
  { mode: "all", label: "全員" },
  { mode: "mine", label: "自分" },
  { mode: "friends", label: "フレンド" },
];

/** iOS セグメンテッドコントロール風の表示フィルター */
export default function MapFilterTabs({ mode, onChange }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        top: "calc(env(safe-area-inset-top, 0px) + 66px)",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        background: "rgba(255,255,255,0.96)",
        borderRadius: "20px",
        boxShadow: "var(--shadow-float)",
        padding: "3px",
        zIndex: 3,
      }}
    >
      {tabs.map((t) => (
        <button
          key={t.mode}
          className="press"
          onClick={() => onChange(t.mode)}
          style={{
            borderRadius: "17px",
            padding: "7px 16px",
            fontSize: "13px",
            background: mode === t.mode ? "var(--text)" : "transparent",
            color: mode === t.mode ? "white" : "var(--text-sub)",
            fontWeight: mode === t.mode ? 700 : 500,
            transition: "background 0.2s, color 0.2s",
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
