import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateClient } from "aws-amplify/data";
import { fetchUser, type UserType } from "../../api/user";
import type { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>({ authMode: "userPool" });

export default function UserSettingsPage({ userId }: { userId: string }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser(userId).then((data) => {
      if (data) setUser(data);
    });
  }, [userId]);

  const updateUser = async (user: UserType) => {
    try {
      const res = await client.models.User.update({
        id: user.id,
        cognitoSub: user.cognitoSub || "",
        email: user.email,
        username: user.username,
        profileImage: user.profileImage || "",
        owner: user.owner,
      });
      return res.data;
    } catch (err) {
      console.error("ユーザー更新エラー:", err);
      throw err;
    }
  };

  if (!user) return <p>読み込み中...</p>;

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        background: "#f9f9f9",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>ユーザー設定</h2>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", fontWeight: 600, marginBottom: "5px" }}>メール</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          style={{
            width: "100%",
            padding: "8px 10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", fontWeight: 600, marginBottom: "5px" }}>ユーザー名</label>
        <input
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          style={{
            width: "100%",
            padding: "8px 10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid #888",
            background: "#eee",
            cursor: "pointer",
          }}
        >
          戻る
        </button>

        <button
          onClick={async () => {
            setIsSaving(true);
            try {
              await updateUser(user);
              alert("保存しました");
            } catch (err) {
              alert("保存に失敗しました");
            } finally {
              setIsSaving(false);
            }
          }}
          disabled={isSaving}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            background: isSaving ? "#aaa" : "#4CAF50",
            color: "white",
            cursor: isSaving ? "not-allowed" : "pointer",
          }}
        >
          {isSaving ? "保存中..." : "保存"}
        </button>
      </div>
    </div>
  );
}
