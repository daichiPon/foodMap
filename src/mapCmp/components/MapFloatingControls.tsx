import { LocateIcon, PinIcon } from "../../components/icons";

type Props = {
  onCurrentLocation: () => void;
  onRegisterHere: () => void;
};

/** マップ右下の現在地FABと、ピン位置を登録するフローティングチップ */
export default function MapFloatingControls({ onCurrentLocation, onRegisterHere }: Props) {
  return (
    <>
      <button
        className="press"
        onClick={onCurrentLocation}
        aria-label="現在地に移動"
        style={{
          position: "absolute",
          right: "16px",
          bottom: "92px",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.96)",
          boxShadow: "var(--shadow-float)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#4A90D9",
          zIndex: 3,
        }}
      >
        <LocateIcon size={21} strokeWidth={2.1} />
      </button>

      <button
        className="press"
        onClick={onRegisterHere}
        style={{
          position: "absolute",
          left: "50%",
          bottom: "24px",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "12px 20px",
          borderRadius: "26px",
          background: "var(--primary-gradient)",
          color: "white",
          fontSize: "14px",
          fontWeight: 700,
          boxShadow: "0 6px 18px rgba(255,107,107,0.45)",
          whiteSpace: "nowrap",
          zIndex: 3,
        }}
      >
        <PinIcon size={17} strokeWidth={2.3} />
        この場所を登録
      </button>
    </>
  );
}
