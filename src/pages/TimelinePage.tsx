import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { fetchLikesByLocation, likeLocation, unlikeLocation, type LikeType } from "../api/likes";
import { fetchWantsByLocation, wantLocation, unwantLocation, type WantType } from "../api/wants";
import { fetchUserMap } from "../api/follows";
import type { UserType } from "../api/user";
import PageHeader from "../components/PageHeader";

const client = generateClient<Schema>({ authMode: "userPool" });

type LocationType = Schema["Location"]["type"];

export default function TimelinePage({ userId }: { userId: string }) {
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [likesMap, setLikesMap] = useState<Map<string, LikeType[]>>(new Map());
  const [wantsMap, setWantsMap] = useState<Map<string, WantType[]>>(new Map());
  const [userMap, setUserMap] = useState<Map<string, UserType>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [locRes, likes, wants, users] = await Promise.all([
          client.models.Location.list({ limit: 1000 }),
          fetchLikesByLocation(),
          fetchWantsByLocation(),
          fetchUserMap(),
        ]);
        const sorted = (locRes.data || []).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setLocations(sorted);
        setLikesMap(likes);
        setWantsMap(wants);
        setUserMap(users);
      } catch (err) {
        console.error("タイムライン取得エラー:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleLikeToggle = async (locationId: string) => {
    const likes = likesMap.get(locationId) || [];
    const myLike = likes.find((l) => l.cognitoSub === userId);

    // 楽観的更新
    const next = new Map(likesMap);
    if (myLike) {
      next.set(locationId, likes.filter((l) => l.id !== myLike.id));
      setLikesMap(next);
      const ok = await unlikeLocation(myLike.id);
      if (!ok) {
        next.set(locationId, likes);
        setLikesMap(new Map(next));
      }
    } else {
      const optimistic = { id: `tmp-${Date.now()}`, locationId, cognitoSub: userId } as LikeType;
      next.set(locationId, [...likes, optimistic]);
      setLikesMap(next);
      const created = await likeLocation(locationId, userId);
      const fixed = new Map(next);
      if (created) {
        fixed.set(locationId, [...likes, created]);
      } else {
        fixed.set(locationId, likes);
      }
      setLikesMap(fixed);
    }
  };

  const handleWantToggle = async (locationId: string) => {
    const wants = wantsMap.get(locationId) || [];
    const myWant = wants.find((w) => w.cognitoSub === userId);

    // 楽観的更新
    const next = new Map(wantsMap);
    if (myWant) {
      next.set(locationId, wants.filter((w) => w.id !== myWant.id));
      setWantsMap(next);
      const ok = await unwantLocation(myWant.id);
      if (!ok) {
        next.set(locationId, wants);
        setWantsMap(new Map(next));
      }
    } else {
      const optimistic = { id: `tmp-${Date.now()}`, locationId, cognitoSub: userId } as WantType;
      next.set(locationId, [...wants, optimistic]);
      setWantsMap(next);
      const created = await wantLocation(locationId, userId);
      const fixed = new Map(next);
      if (created) {
        fixed.set(locationId, [...wants, created]);
      } else {
        fixed.set(locationId, wants);
      }
      setWantsMap(fixed);
    }
  };

  if (loading) {
    return (
      <p style={{ textAlign: "center", marginTop: "40px", color: "var(--text-sub)" }}>
        読み込み中...
      </p>
    );
  }

  return (
    <div style={{ paddingBottom: "24px" }}>
      <PageHeader title="タイムライン" />
      <div style={{ maxWidth: "480px", margin: "0 auto", padding: "4px 16px 0" }}>

      {locations.length === 0 && (
        <p style={{ textAlign: "center", color: "var(--text-sub)" }}>まだ投稿がありません</p>
      )}

      {locations.map((loc) => {
        const likes = likesMap.get(loc.id) || [];
        const liked = likes.some((l) => l.cognitoSub === userId);
        const wants = wantsMap.get(loc.id) || [];
        const wanted = wants.some((w) => w.cognitoSub === userId);
        const poster = loc.cognitoSub ? userMap.get(loc.cognitoSub) : undefined;
        const date = new Date(loc.createdAt).toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

        return (
          <article
            key={loc.id}
            className="anim-pop-in"
            style={{
              background: "var(--surface)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-card)",
              marginBottom: "16px",
              overflow: "hidden",
            }}
          >
            {/* 投稿者ヘッダー */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "#FFE0D6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                👤
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "14px" }}>
                  {poster?.username || "名無しさん"}
                </div>
                <div style={{ fontSize: "11px", color: "#999" }}>{date}</div>
              </div>
            </div>

            {loc.imageUrl && (
              <img
                src={loc.imageUrl}
                alt={loc.name || "店舗画像"}
                style={{ width: "100%", maxHeight: "300px", objectFit: "cover", display: "block" }}
              />
            )}

            <div style={{ padding: "12px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                <h3 style={{ margin: 0, fontSize: "16px" }}>{loc.name || "無名地点"}</h3>
                {loc.category && (
                  <span
                    style={{
                      fontSize: "11px",
                      background: "#FFF0EB",
                      color: "#FF6B6B",
                      borderRadius: "10px",
                      padding: "2px 8px",
                    }}
                  >
                    {loc.category}
                  </span>
                )}
                {loc.priceRange && (
                  <span style={{ fontSize: "11px", color: "#888" }}>{loc.priceRange}</span>
                )}
              </div>

              {loc.description && (
                <p style={{ margin: "8px 0 0", fontSize: "14px", color: "#444" }}>
                  {loc.description}
                </p>
              )}
              {loc.address && (
                <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#999" }}>📍 {loc.address}</p>
              )}

              <div style={{ display: "flex", alignItems: "center", gap: "18px", marginTop: "10px" }}>
                <button
                  className="press"
                  onClick={() => handleLikeToggle(loc.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: liked ? "var(--primary)" : "var(--text-sub)",
                  }}
                >
                  <span style={{ fontSize: "20px" }}>{liked ? "❤️" : "🤍"}</span>
                  <span>{likes.length}</span>
                </button>

                <button
                  className="press"
                  onClick={() => handleWantToggle(loc.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: wanted ? "#0A84FF" : "var(--text-sub)",
                    background: wanted ? "#EAF3FF" : "#f3f4f6",
                    borderRadius: "14px",
                    padding: "6px 12px",
                  }}
                >
                  <span style={{ fontSize: "15px" }}>🔖</span>
                  <span>{wanted ? "行きたい済" : "行きたい"}</span>
                  {wants.length > 0 && <span>{wants.length}</span>}
                </button>
              </div>
            </div>
          </article>
        );
      })}
      </div>
    </div>
  );
}
