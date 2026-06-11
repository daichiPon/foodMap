import { useState, useEffect } from "react";
import type React from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";
import { CATEGORIES, PRICE_RANGES } from "../../constants/food";
import { SearchIcon } from "../../components/icons";

type Props = {
  onSearchResult: (data: Schema["Location"]["type"][]) => void;
  onClose: () => void;
  onValuesChange?: (value: string) => void;
};
type User = Schema["User"]["type"];
type LocationFilter = {
  category?: { eq: string };
  priceRange?: { eq: string };
  cognitoSub?: { eq: string };
};

const client = generateClient<Schema>({ authMode: "identityPool" });

const selectStyle: React.CSSProperties = {
  padding: "14px 16px",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--border)",
  background: "#f7f8fa",
  fontSize: "15px",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};

export default function LunchSearchSideForm({ onSearchResult, onClose, onValuesChange }: Props) {
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");

  const handleSearch = async () => {
    const filters: LocationFilter[] = [];

    if (category) {
      filters.push({ category: { eq: category } });
    }
    if (priceRange) {
      filters.push({ priceRange: { eq: priceRange } });
    }
    if (selectedUserId) {
      filters.push({ cognitoSub: { eq: selectedUserId } });
    }

    const res = await client.models.Location.list({
      filter:
        filters.length > 1
          ? { and: filters }
          : filters.length === 1
            ? filters[0]
            : undefined,
    });

    onClose();
    onSearchResult(res.data);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await client.models.User.list();
        setUsers(res.data);

        let next = res.nextToken;
        while (next) {
          const more = await client.models.User.list({ nextToken: next });
          setUsers((prev) => [...prev, ...more.data]);
          next = more.nextToken;
        }
      } catch (err) {
        console.error("ユーザー一覧取得エラー:", err);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!onValuesChange) return;
    const searchText = category + priceRange + selectedUserName;
    onValuesChange(searchText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, priceRange, selectedUserId, onValuesChange]);

  return (
    <>
      {/* 背景タップで閉じる */}
      <div
        className="anim-fade-in"
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.25)",
          zIndex: 30,
        }}
      />

      <div
        className="anim-slide-up"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          boxSizing: "border-box",
          background: "var(--surface)",
          borderTopLeftRadius: "22px",
          borderTopRightRadius: "22px",
          boxShadow: "0 -8px 32px rgba(0,0,0,0.18)",
          padding: "0 20px",
          paddingBottom: "max(env(safe-area-inset-bottom), 20px)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          zIndex: 31,
        }}
      >
        {/* グラバー */}
        <div
          style={{
            width: "36px",
            height: "5px",
            borderRadius: "3px",
            background: "#d8dade",
            margin: "10px auto 2px",
          }}
        />

        <h3 style={{ margin: "0 0 4px", fontSize: "17px", fontWeight: 700 }}>お店を検索</h3>

        <select value={category} onChange={(e) => setCategory(e.target.value)} style={selectStyle}>
          <option value="">カテゴリーを選択</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          style={selectStyle}
        >
          <option value="">一人当たりの金額を選択</option>
          {PRICE_RANGES.map((pri) => (
            <option key={pri} value={pri}>
              {pri}
            </option>
          ))}
        </select>

        <select
          value={selectedUserId}
          onChange={(e) => {
            const id = e.currentTarget.value;
            setSelectedUserId(id);

            const u = users.find((u) => u.id === id);
            setSelectedUserName(u?.username ?? "");
          }}
          style={selectStyle}
        >
          <option value="">ユーザを選択</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>

        <button
          className="press"
          onClick={handleSearch}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            background: "var(--primary-gradient)",
            color: "white",
            borderRadius: "14px",
            padding: "15px",
            fontSize: "16px",
            fontWeight: 700,
            boxShadow: "0 6px 16px rgba(255,107,107,0.4)",
            marginTop: "4px",
          }}
        >
          <SearchIcon size={18} strokeWidth={2.4} />
          検索
        </button>
      </div>
    </>
  );
}
