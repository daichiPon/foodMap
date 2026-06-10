import { SearchIcon, CloseIcon } from "../../components/icons";

type Props = {
  onSearchOpen: () => void;
  hasSearchFilter: boolean;
  onClearSearch: () => void;
};

/** マップ上部の検索バー（Google Maps 風フローティングピル） */
export default function MapHeader({ onSearchOpen, hasSearchFilter, onClearSearch }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        top: "calc(env(safe-area-inset-top, 0px) + 12px)",
        left: "16px",
        right: "16px",
        zIndex: 3,
        display: "flex",
        gap: "8px",
        alignItems: "center",
      }}
    >
      <button
        className="press"
        onClick={onSearchOpen}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "13px 16px",
          borderRadius: "24px",
          background: "rgba(255,255,255,0.96)",
          boxShadow: "var(--shadow-float)",
          color: "var(--text-sub)",
          fontSize: "15px",
        }}
      >
        <SearchIcon size={18} strokeWidth={2.2} />
        お店を検索
      </button>

      {hasSearchFilter && (
        <button
          className="press anim-pop-in"
          onClick={onClearSearch}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "10px 14px",
            borderRadius: "20px",
            background: "var(--text)",
            color: "white",
            fontSize: "13px",
            fontWeight: 600,
            boxShadow: "var(--shadow-float)",
            whiteSpace: "nowrap",
          }}
        >
          <CloseIcon size={14} strokeWidth={2.4} />
          解除
        </button>
      )}
    </div>
  );
}
