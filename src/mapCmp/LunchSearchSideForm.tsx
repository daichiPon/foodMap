import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

type Props = {
  onSearchResult: (data: Schema["Location"]["type"][]) => void;
  onClose: () => void;
};

export default function LunchSearchSideForm({ onSearchResult, onClose }: Props) {
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const client = generateClient<Schema>({ authMode: "identityPool" });

  const categories = [
    "大衆居酒屋",
    "おしゃれ居酒屋",
    "ラーメン",
    "寿司",
    "海鮮",
    "焼肉",
    "和食",
    "洋食",
    "中華",
    "カフェ",
    "ファストフード",
  ];
  const priceRanges = ["¥0~¥1000", "¥1000~¥2000", "¥3000~¥4000", "¥4000~¥5000", "¥5000~ ∞ "];
  console.log("category", category);
  const handleSearch = async () => {
    const filters: any[] = [];

    // 入力があれば filter に追加
    if (category) {
      filters.push({ category: { eq: category } });
    }
    if (priceRange) {
      filters.push({ priceRange: { eq: priceRange } });
    }

    const res = await client.models.Location.list({
      filter:
        filters.length > 1
          ? { and: filters } // 両方入力されていたら and 検索
          : filters.length === 1
            ? filters[0] // 片方だけならその条件
            : undefined, // 両方空なら全件取得
    });

    console.log("res", res);
    onClose();
    //親コンポーネントに渡す
    onSearchResult(res.data);
  };

  const inputStyle: React.CSSProperties = {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: "none", // デフォルト矢印を消す
    backgroundColor: "white",
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#87CEFA",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  const optionStyle: React.CSSProperties = {
    borderRadius: "8px",
    padding: "8px",
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "300px",
        height: "100%",
        background: "white",
        boxShadow: "-2px 0 8px rgba(0,0,0,0.2)",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        zIndex: 3,
      }}
    >
      <button
        onClick={onClose}
        style={{
          alignSelf: "flex-end",
          border: "none",
          background: "transparent",
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        ×
      </button>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        style={selectStyle}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#87CEFA")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
      >
        <option value="" style={{ color: "#888" }}>
          カテゴリーを選択
        </option>
        {categories.map((cat) => (
          <option key={cat} value={cat} style={optionStyle}>
            {cat}
          </option>
        ))}
      </select>
      <select
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
        required
        style={selectStyle}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#87CEFA")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
      >
        <option value="" style={{ color: "#888" }}>
          一人当たりの金額を選択
        </option>
        {priceRanges.map((pri) => (
          <option key={pri} value={pri} style={optionStyle}>
            {pri}
          </option>
        ))}
      </select>
      <button
        type="submit"
        style={buttonStyle}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#00BFFF")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#87CEFA")}
        onClick={handleSearch}
      >
        検索
      </button>
    </div>
  );
}
