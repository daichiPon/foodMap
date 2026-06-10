import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function AppLayout() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <main style={{ flex: 1, overflowY: "auto", position: "relative" }}>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
