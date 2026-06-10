import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { fetchUser, type UserType } from "../api/user";
import { fetchFollowing, unfollowUser, fetchUserMap, type FollowType } from "../api/follows";
import PageHeader from "../components/PageHeader";
import { SettingsIcon, LogoutIcon, ChevronRightIcon, UserIcon } from "../components/icons";
import LocationBottomSheet from "../mapCmp/components/LocationBottomSheet";

const client = generateClient<Schema>({ authMode: "userPool" });

type LocationType = Schema["Location"]["type"];
type Tab = "posts" | "likes" | "friends";

export default function MyPage({ userId }: { userId: string }) {
  const navigate = useNavigate();
  const { signOut } = useAuthenticator();

  const [user, setUser] = useState<UserType | null>(null);
  const [myPosts, setMyPosts] = useState<LocationType[]>([]);
  const [likedLocations, setLikedLocations] = useState<LocationType[]>([]);
  const [following, setFollowing] = useState<FollowType[]>([]);
  const [userMap, setUserMap] = useState<Map<string, UserType>>(new Map());
  const [tab, setTab] = useState<Tab>("posts");
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null);

  useEffect(() => {
    const load = async () => {
      const [me, follows, users] = await Promise.all([
        fetchUser(userId),
        fetchFollowing(userId),
        fetchUserMap(),
      ]);
      setUser(me);
      setFollowing(follows);
      setUserMap(users);

      try {
        const [postsRes, likesRes] = await Promise.all([
          client.models.Location.list({ filter: { cognitoSub: { eq: userId } }, limit: 1000 }),
          client.models.Like.list({ filter: { cognitoSub: { eq: userId } }, limit: 1000 }),
        ]);
        const posts = (postsRes.data || []).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setMyPosts(posts);

        const likedIds = (likesRes.data || []).map((l) => l.locationId);
        if (likedIds.length > 0) {
          const locRes = await client.models.Location.list({
            filter: { or: likedIds.map((id) => ({ id: { eq: id } })) },
            limit: 1000,
          });
          setLikedLocations(locRes.data || []);
        }
      } catch (err) {
        console.error("マイページ取得エラー:", err);
      }
    };
    load();
  }, [userId]);

  const handleUnfollow = async (f: FollowType) => {
    const name = userMap.get(f.followeeId)?.username || "このユーザー";
    if (!confirm(`${name} さんのフォローを解除しますか？`)) return;
    const ok = await unfollowUser(f.id);
    if (ok) setFollowing((prev) => prev.filter((x) => x.id !== f.id));
  };

  const tabStyle = (active: boolean): React.CSSProperties => ({
    flex: 1,
    padding: "10px 0",
    border: "none",
    borderBottom: active ? "2px solid #FF6B6B" : "2px solid transparent",
    background: "transparent",
    color: active ? "#FF6B6B" : "#888",
    fontWeight: active ? 700 : 400,
    fontSize: "14px",
    cursor: "pointer",
  });

  const locationRow = (loc: LocationType) => (
    <div
      key={loc.id}
      onClick={() => setSelectedLocation(loc)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 12px",
        background: "white",
        borderRadius: "10px",
        marginBottom: "6px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        cursor: "pointer",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: "14px" }}>{loc.name}</div>
        <div style={{ fontSize: "12px", color: "#888" }}>
          {loc.category} {loc.priceRange}
        </div>
      </div>
      {loc.imageUrl && (
        <img
          src={loc.imageUrl}
          alt={loc.name || ""}
          style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "8px" }}
        />
      )}
    </div>
  );

  return (
    <div style={{ paddingBottom: "24px" }}>
      <PageHeader title="マイページ" />
      <div style={{ maxWidth: "480px", margin: "0 auto", padding: "4px 16px 0" }}>
      {/* プロフィール */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          padding: "18px",
          background: "var(--surface)",
          borderRadius: "var(--radius)",
          boxShadow: "var(--shadow-card)",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: "58px",
            height: "58px",
            borderRadius: "50%",
            background: "var(--primary-gradient)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <UserIcon size={28} strokeWidth={2} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: "17px" }}>{user?.username || "読み込み中..."}</div>
          <div style={{ fontSize: "12px", color: "#888" }}>{user?.email}</div>
          <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
            投稿 {myPosts.length} ・ いいね {likedLocations.length} ・ フレンド {following.length}
          </div>
        </div>
      </div>

      {/* タブ */}
      <div style={{ display: "flex", borderBottom: "1px solid #eee", marginBottom: "12px" }}>
        <button style={tabStyle(tab === "posts")} onClick={() => setTab("posts")}>
          📍 投稿
        </button>
        <button style={tabStyle(tab === "likes")} onClick={() => setTab("likes")}>
          ❤️ いいね
        </button>
        <button style={tabStyle(tab === "friends")} onClick={() => setTab("friends")}>
          👥 フレンド
        </button>
      </div>

      {tab === "posts" && (
        <div>
          {myPosts.length === 0 && (
            <p style={{ color: "#888", fontSize: "14px" }}>まだ投稿がありません</p>
          )}
          {myPosts.map(locationRow)}
        </div>
      )}

      {tab === "likes" && (
        <div>
          {likedLocations.length === 0 && (
            <p style={{ color: "#888", fontSize: "14px" }}>いいねした店舗がまだありません</p>
          )}
          {likedLocations.map(locationRow)}
        </div>
      )}

      {tab === "friends" && (
        <div>
          {following.length === 0 && (
            <p style={{ color: "#888", fontSize: "14px" }}>まだフレンドがいません</p>
          )}
          {following.map((f) => (
            <div
              key={f.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 12px",
                background: "white",
                borderRadius: "10px",
                marginBottom: "6px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              }}
            >
              <span>👤 {userMap.get(f.followeeId)?.username || "不明なユーザー"}</span>
              <button
                onClick={() => handleUnfollow(f)}
                style={{
                  background: "transparent",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "4px 10px",
                  fontSize: "12px",
                  color: "#888",
                  cursor: "pointer",
                }}
              >
                解除
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 設定・ログアウト */}
      <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <button
          className="press"
          onClick={() => navigate("/settings")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "15px 16px",
            borderRadius: "var(--radius-sm)",
            background: "var(--surface)",
            boxShadow: "var(--shadow-card)",
            fontSize: "15px",
            fontWeight: 500,
            textAlign: "left",
          }}
        >
          <SettingsIcon size={19} strokeWidth={2} style={{ color: "var(--text-sub)" }} />
          ユーザー設定
          <ChevronRightIcon
            size={17}
            strokeWidth={2.2}
            style={{ marginLeft: "auto", color: "#c5c8cf" }}
          />
        </button>
        <button
          className="press"
          onClick={signOut}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "15px 16px",
            borderRadius: "var(--radius-sm)",
            background: "var(--surface)",
            boxShadow: "var(--shadow-card)",
            color: "#E53935",
            fontSize: "15px",
            fontWeight: 500,
            textAlign: "left",
          }}
        >
          <LogoutIcon size={19} strokeWidth={2} />
          ログアウト
        </button>
      </div>

      {selectedLocation && (
        <LocationBottomSheet location={selectedLocation} onClose={() => setSelectedLocation(null)} />
      )}
      </div>
    </div>
  );
}
