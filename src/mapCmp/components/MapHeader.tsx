import { useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { mapStyles } from "../mapStyles";

type Props = {
  menuOpen: boolean;
  onMenuToggle: () => void;
  onMenuClose: () => void;
  onSearchOpen: () => void;
  hasSearchFilter: boolean;
  onClearSearch: () => void;
};

export default function MapHeader({
  menuOpen,
  onMenuToggle,
  onMenuClose,
  onSearchOpen,
  hasSearchFilter,
  onClearSearch,
}: Props) {
  const navigate = useNavigate();
  const { signOut } = useAuthenticator();

  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: "5%",
        right: "5%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 12px",
        background: "rgba(255, 255, 255, 0.4)",
        borderRadius: "14px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        backdropFilter: "blur(8px)",
        zIndex: 3,
      }}
    >
      <button onClick={onMenuToggle} style={mapStyles.iconButton}>
        ☰
      </button>

      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: "10px",
            background: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            padding: "8px 0",
            minWidth: "150px",
            zIndex: 10,
          }}
        >
          <button
            style={mapStyles.bottomBtn}
            onClick={() => {
              onSearchOpen();
              onMenuClose();
            }}
          >
            <span>検索</span>
          </button>

          <button
            style={mapStyles.menuItem}
            onClick={() => {
              navigate("/settings");
              onMenuClose();
            }}
          >
            ユーザー設定
          </button>

          <button
            style={mapStyles.menuItem}
            onClick={() => {
              signOut();
              onMenuClose();
            }}
          >
            ログアウト
          </button>
        </div>
      )}

      {hasSearchFilter && (
        <button
          onClick={onClearSearch}
          style={{
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          全体表示
        </button>
      )}
    </div>
  );
}
