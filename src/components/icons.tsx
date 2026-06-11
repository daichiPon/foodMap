import type React from "react";

type IconProps = {
  size?: number;
  strokeWidth?: number;
  style?: React.CSSProperties;
};

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const MapIcon = ({ size = 24, strokeWidth = 2, style }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth} style={style}>
    <path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6 9 4Z" />
    <path d="M9 4v14M15 6v14" />
  </svg>
);

export const TimelineIcon = ({ size = 24, strokeWidth = 2, style }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth} style={style}>
    <rect x="4" y="3" width="16" height="8" rx="2.5" />
    <rect x="4" y="14" width="16" height="8" rx="2.5" />
  </svg>
);

export const PlusIcon = ({ size = 24, strokeWidth = 2.4, style }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth} style={style}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const UsersIcon = ({ size = 24, strokeWidth = 2, style }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth} style={style}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5" />
    <path d="M16 5a3.5 3.5 0 0 1 0 6.8M18 14.8c2.1.7 3.5 2.4 3.5 5.2" />
  </svg>
);

export const UserIcon = ({ size = 24, strokeWidth = 2, style }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth} style={style}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20.5c0-3.7 3.4-6 7.5-6s7.5 2.3 7.5 6" />
  </svg>
);

export const SearchIcon = ({ size = 24, strokeWidth = 2, style }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth} style={style}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20.5 20.5-4.2-4.2" />
  </svg>
);

export const LocateIcon = ({ size = 24, strokeWidth = 2, style }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth} style={style}>
    <path d="M21 3 10.5 13.5M21 3l-7 18-3.5-7.5L3 10l18-7Z" />
  </svg>
);

export const PinIcon = ({ size = 24, strokeWidth = 2, style }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth} style={style}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const CameraIcon = ({ size = 24, strokeWidth = 2, style }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth} style={style}>
    <path d="M4 8h2.5l1.5-2.5h8L17.5 8H20a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 20 20H4a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 4 8Z" />
    <circle cx="12" cy="13.5" r="3.5" />
  </svg>
);

export const ChevronRightIcon = ({ size = 24, strokeWidth = 2, style }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth} style={style}>
    <path d="m9 5 7 7-7 7" />
  </svg>
);

export const SettingsIcon = ({ size = 24, strokeWidth = 2, style }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth} style={style}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 19.35a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.65 15a1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.65 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.65a1.7 1.7 0 0 0 1.03-1.56V3a2 2 0 1 1 4 0v.09c0 .68.4 1.3 1.03 1.56a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87c.26.63.88 1.03 1.56 1.03H21a2 2 0 1 1 0 4h-.09c-.68 0-1.3.4-1.51 1.03Z" />
  </svg>
);

export const LogoutIcon = ({ size = 24, strokeWidth = 2, style }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth} style={style}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="m16 17 5-5-5-5M21 12H9" />
  </svg>
);

export const QrIcon = ({ size = 24, strokeWidth = 2, style }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth} style={style}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <path d="M14 14h3v3h-3zM21 14v.5M14 20.5v.5h3.5M21 18v3" />
  </svg>
);

export const CloseIcon = ({ size = 24, strokeWidth = 2, style }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth} style={style}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
