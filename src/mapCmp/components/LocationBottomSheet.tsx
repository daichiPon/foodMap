import type { Schema } from "../../../amplify/data/resource";

type Props = {
  location: Schema["Location"]["type"];
  onClose: () => void;
};

export default function LocationBottomSheet({ location, onClose }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "white",
        maxHeight: "50%",
        overflowY: "auto",
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.2)",
        padding: "16px",
        zIndex: 4,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontWeight: "bold", color: "#000" }}>
          {location.name || "無名地点"}
        </h2>
        <button
          style={{ fontSize: "20px", background: "transparent", border: "none", cursor: "pointer" }}
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      <p style={{ marginTop: "3px", color: "#000" }}>{location.category}</p>
      <p style={{ marginTop: "3px", color: "#000" }}>{location.priceRange}</p>
      <p style={{ marginTop: "3px", color: "#000" }}>{location.description}</p>
      <p style={{ marginTop: "3px", color: "#000" }}>{location.address}</p>
      {location.imageUrl && (
        <img
          src={location.imageUrl}
          alt={location.name || "登録画像"}
          style={{
            marginTop: "10px",
            width: "90%",
            maxHeight: "200px",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />
      )}
    </div>
  );
}
