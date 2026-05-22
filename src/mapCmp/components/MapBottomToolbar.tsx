import { mapStyles } from "../mapStyles";

type Props = {
  onRegister: () => void;
  navigateIcon: string;
  navigateLabel: string;
  onNavigate: () => void;
  onCurrentLocation: () => void;
};

export default function MapBottomToolbar({
  onRegister,
  navigateIcon,
  navigateLabel,
  onNavigate,
  onCurrentLocation,
}: Props) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 30,
        left: "10%",
        right: "10%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px 0",
        background: "rgba(255, 255, 255, 0.4)",
        borderRadius: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        backdropFilter: "blur(8px)",
        zIndex: 3,
      }}
    >
      <button style={mapStyles.bottomBtn} onClick={onRegister}>
        <div style={mapStyles.circleIcon}>＋</div>
        <span>登録</span>
      </button>

      <button style={mapStyles.bottomBtn} onClick={onNavigate}>
        <div style={mapStyles.circleIcon}>{navigateIcon}</div>
        <span>{navigateLabel}</span>
      </button>

      <button style={mapStyles.bottomBtn} onClick={onCurrentLocation}>
        <div style={mapStyles.circleIcon}>▲</div>
        <span>現在地</span>
      </button>
    </div>
  );
}
