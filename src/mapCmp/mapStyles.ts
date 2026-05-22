import type React from "react";

export const mapStyles = {
  iconButton: {
    background: "transparent",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
  } as React.CSSProperties,

  bottomBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    color: "#333",
  } as React.CSSProperties,

  circleIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#f2f2f2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "4px",
    fontSize: "20px",
  } as React.CSSProperties,

  menuItem: {
    width: "100%",
    textAlign: "left" as const,
    padding: "10px 16px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
  } as React.CSSProperties,
};
