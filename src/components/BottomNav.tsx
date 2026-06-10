import { NavLink } from "react-router-dom";
import { MapIcon, TimelineIcon, PlusIcon, UsersIcon, UserIcon } from "./icons";

const tabs = [
  { to: "/", Icon: MapIcon, label: "マップ" },
  { to: "/timeline", Icon: TimelineIcon, label: "タイムライン" },
  { to: "/register", Icon: PlusIcon, label: "登録", primary: true },
  { to: "/friends", Icon: UsersIcon, label: "フレンド" },
  { to: "/mypage", Icon: UserIcon, label: "マイページ" },
];

export default function BottomNav() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "stretch",
        height: "58px",
        paddingBottom: "env(safe-area-inset-bottom)",
        background: "rgba(255, 255, 255, 0.82)",
        backdropFilter: "blur(20px) saturate(1.8)",
        WebkitBackdropFilter: "blur(20px) saturate(1.8)",
        borderTop: "0.5px solid rgba(0,0,0,0.12)",
        flexShrink: 0,
        zIndex: 20,
      }}
    >
      {tabs.map(({ to, Icon, label, primary }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className="press"
          style={({ isActive }) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "3px",
            flex: 1,
            color: isActive ? "var(--primary)" : "#9b9fa8",
            fontSize: "10px",
            fontWeight: isActive ? 700 : 500,
            letterSpacing: "0.01em",
          })}
        >
          {primary ? (
            <div
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "50%",
                background: "var(--primary-gradient)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "-20px",
                boxShadow: "0 6px 16px rgba(255,107,107,0.45)",
                border: "3px solid var(--bg)",
              }}
            >
              <PlusIcon size={22} />
            </div>
          ) : (
            <Icon size={23} strokeWidth={2.1} />
          )}
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
