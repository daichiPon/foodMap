import { useCallback, useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import {
  fetchFollowing,
  followUser,
  unfollowUser,
  searchUsers,
  fetchUserMap,
  type FollowType,
} from "../api/follows";
import type { UserType } from "../api/user";
import MiniMap from "../components/MiniMap";
import PageHeader from "../components/PageHeader";
import { SearchIcon } from "../components/icons";
import LocationBottomSheet from "../mapCmp/components/LocationBottomSheet";

const client = generateClient<Schema>({ authMode: "userPool" });

type LocationType = Schema["Location"]["type"];

const MY_COLOR = "#4A90D9";
const FRIEND_COLOR = "#FF6B6B";

export default function FriendSharePage({ userId }: { userId: string }) {
  const [following, setFollowing] = useState<FollowType[]>([]);
  const [userMap, setUserMap] = useState<Map<string, UserType>>(new Map());
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<UserType[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<UserType | null>(null);
  const [sharedLocations, setSharedLocations] = useState<LocationType[]>([]);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null);

  useEffect(() => {
    Promise.all([fetchFollowing(userId), fetchUserMap()]).then(([follows, users]) => {
      setFollowing(follows);
      setUserMap(users);
    });
  }, [userId]);

  /** フレンド選択 → 2人分の地点を取得 */
  useEffect(() => {
    if (!selectedFriend) {
      setSharedLocations([]);
      return;
    }
    const load = async () => {
      try {
        const res = await client.models.Location.list({
          filter: {
            or: [{ cognitoSub: { eq: userId } }, { cognitoSub: { eq: selectedFriend.id } }],
          },
          limit: 1000,
        });
        setSharedLocations(res.data || []);
      } catch (err) {
        console.error("共有地点取得エラー:", err);
      }
    };
    load();
  }, [selectedFriend, userId]);

  const handleSearch = async () => {
    if (!keyword.trim()) return;
    setSearching(true);
    const results = await searchUsers(keyword.trim());
    setSearchResults(results.filter((u) => u.id !== userId));
    setSearching(false);
  };

  const handleFollow = async (target: UserType) => {
    const created = await followUser(userId, target.id);
    if (created) {
      setFollowing((prev) => [...prev, created]);
    } else {
      alert("フォローに失敗しました");
    }
  };

  const handleUnfollow = async (followId: string) => {
    const ok = await unfollowUser(followId);
    if (ok) {
      setFollowing((prev) => prev.filter((f) => f.id !== followId));
      setSelectedFriend(null);
    } else {
      alert("フォロー解除に失敗しました");
    }
  };

  const markerColor = useCallback(
    (loc: LocationType) => (loc.cognitoSub === userId ? MY_COLOR : FRIEND_COLOR),
    [userId]
  );

  const followedIds = new Set(following.map((f) => f.followeeId));

  return (
    <div style={{ paddingBottom: "24px" }}>
      <PageHeader title="フレンド" />
      <div style={{ maxWidth: "480px", margin: "0 auto", padding: "4px 16px 0" }}>

      {/* ユーザー検索 */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <input
          placeholder="ユーザー名で検索してフォロー"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          style={{
            flex: 1,
            padding: "13px 16px",
            borderRadius: "22px",
            border: "1px solid var(--border)",
            background: "var(--surface)",
            fontSize: "15px",
            outline: "none",
            boxShadow: "var(--shadow-card)",
          }}
        />
        <button
          className="press"
          onClick={handleSearch}
          disabled={searching}
          aria-label="検索"
          style={{
            background: "var(--primary-gradient)",
            color: "white",
            borderRadius: "50%",
            width: "46px",
            height: "46px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(255,107,107,0.35)",
            flexShrink: 0,
          }}
        >
          <SearchIcon size={19} strokeWidth={2.3} />
        </button>
      </div>

      {searchResults.length > 0 && (
        <div style={{ marginBottom: "16px" }}>
          {searchResults.map((u) => (
            <div
              key={u.id}
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
              <span>👤 {u.username}</span>
              {followedIds.has(u.id) ? (
                <span style={{ fontSize: "13px", color: "#999" }}>フォロー中</span>
              ) : (
                <button
                  onClick={() => handleFollow(u)}
                  style={{
                    background: "#FF8E53",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "6px 12px",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  フォロー
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* フレンド一覧 */}
      <h3 style={{ fontSize: "15px", margin: "8px 0" }}>フレンド一覧</h3>
      {following.length === 0 && (
        <p style={{ color: "#888", fontSize: "14px" }}>
          まだフレンドがいません。上の検索からフォローしてみましょう。
        </p>
      )}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
        {following.map((f) => {
          const friend = userMap.get(f.followeeId);
          const active = selectedFriend?.id === f.followeeId;
          return (
            <button
              key={f.id}
              onClick={() => friend && setSelectedFriend(active ? null : friend)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 14px",
                borderRadius: "20px",
                border: active ? "2px solid #FF6B6B" : "1px solid #ddd",
                background: active ? "#FFF0EB" : "white",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              👤 {friend?.username || "不明なユーザー"}
            </button>
          );
        })}
      </div>

      {/* 2人の共有スペース */}
      {selectedFriend && (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <h3 style={{ fontSize: "15px", margin: 0 }}>
              🤝 {selectedFriend.username} さんとの共有マップ
            </h3>
            <button
              onClick={() => {
                const f = following.find((fl) => fl.followeeId === selectedFriend.id);
                if (f && confirm(`${selectedFriend.username} さんのフォローを解除しますか？`)) {
                  handleUnfollow(f.id);
                }
              }}
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

          <div style={{ display: "flex", gap: "12px", fontSize: "12px", marginBottom: "8px" }}>
            <span style={{ color: MY_COLOR }}>● 自分</span>
            <span style={{ color: FRIEND_COLOR }}>● {selectedFriend.username} さん</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: "4px" }}>
              {(["map", "list"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  style={{
                    border: "none",
                    borderRadius: "6px",
                    padding: "4px 10px",
                    fontSize: "12px",
                    cursor: "pointer",
                    background: viewMode === mode ? "#FF6B6B" : "#eee",
                    color: viewMode === mode ? "white" : "#666",
                  }}
                >
                  {mode === "map" ? "マップ" : "リスト"}
                </button>
              ))}
            </div>
          </div>

          {viewMode === "map" ? (
            <MiniMap
              locations={sharedLocations}
              markerColor={markerColor}
              onSelect={setSelectedLocation}
              height="340px"
            />
          ) : (
            <div>
              {sharedLocations.length === 0 && (
                <p style={{ color: "#888", fontSize: "14px" }}>まだ共有できる地点がありません</p>
              )}
              {sharedLocations.map((loc) => (
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
                    borderLeft: `4px solid ${loc.cognitoSub === userId ? MY_COLOR : FRIEND_COLOR}`,
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
              ))}
            </div>
          )}
        </div>
      )}

      {selectedLocation && (
        <LocationBottomSheet location={selectedLocation} onClose={() => setSelectedLocation(null)} />
      )}
      </div>
    </div>
  );
}
