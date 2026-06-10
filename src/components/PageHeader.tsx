import type React from "react";

type Props = {
  title: string;
  /** タイトル右側に置く要素（ボタン等） */
  trailing?: React.ReactNode;
};

/** iOS ラージタイトル風の固定ヘッダー */
export default function PageHeader({ title, trailing }: Props) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 16px 10px",
        background: "rgba(242, 243, 247, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "26px",
          fontWeight: 800,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h1>
      {trailing}
    </header>
  );
}
