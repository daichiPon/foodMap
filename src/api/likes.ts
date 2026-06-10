import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>({ authMode: "userPool" });

export type LikeType = Schema["Like"]["type"];

/** Like テーブルがバックエンドに未デプロイの間は機能を無効化する */
const likeModelReady = (): boolean => Boolean(client.models.Like);

/** 全いいねを取得し locationId ごとにグループ化 */
export const fetchLikesByLocation = async (): Promise<Map<string, LikeType[]>> => {
  const map = new Map<string, LikeType[]>();
  if (!likeModelReady()) return map;
  try {
    const res = await client.models.Like.list({ limit: 1000 });
    (res.data || []).forEach((like) => {
      const list = map.get(like.locationId) || [];
      list.push(like);
      map.set(like.locationId, list);
    });
  } catch (err) {
    console.error("いいね取得エラー:", err);
  }
  return map;
};

/** いいねを付ける */
export const likeLocation = async (locationId: string, userId: string): Promise<LikeType | null> => {
  if (!likeModelReady()) {
    alert("いいね機能は準備中です（バックエンド反映待ち）");
    return null;
  }
  try {
    const res = await client.models.Like.create({ locationId, cognitoSub: userId });
    return res.data ?? null;
  } catch (err) {
    console.error("いいね登録エラー:", err);
    return null;
  }
};

/** いいねを外す */
export const unlikeLocation = async (likeId: string): Promise<boolean> => {
  if (!likeModelReady()) return false;
  try {
    await client.models.Like.delete({ id: likeId });
    return true;
  } catch (err) {
    console.error("いいね削除エラー:", err);
    return false;
  }
};
