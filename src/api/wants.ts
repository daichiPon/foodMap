import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>({ authMode: "userPool" });

export type WantType = Schema["Want"]["type"];

/** Want テーブルがバックエンドに未デプロイの間は機能を無効化する */
const wantModelReady = (): boolean => Boolean(client.models.Want);

/** 全WANTを取得し locationId ごとにグループ化 */
export const fetchWantsByLocation = async (): Promise<Map<string, WantType[]>> => {
  const map = new Map<string, WantType[]>();
  if (!wantModelReady()) return map;
  try {
    const res = await client.models.Want.list({ limit: 1000 });
    (res.data || []).forEach((want) => {
      const list = map.get(want.locationId) || [];
      list.push(want);
      map.set(want.locationId, list);
    });
  } catch (err) {
    console.error("WANT取得エラー:", err);
  }
  return map;
};

/** 自分が付けたWANT一覧 */
export const fetchMyWants = async (userId: string): Promise<WantType[]> => {
  if (!wantModelReady()) return [];
  try {
    const res = await client.models.Want.list({
      filter: { cognitoSub: { eq: userId } },
      limit: 1000,
    });
    return res.data || [];
  } catch (err) {
    console.error("WANT取得エラー:", err);
    return [];
  }
};

/** 行きたいを付ける */
export const wantLocation = async (
  locationId: string,
  userId: string
): Promise<WantType | null> => {
  if (!wantModelReady()) {
    alert("行きたい機能は準備中です（バックエンド反映待ち）");
    return null;
  }
  try {
    const res = await client.models.Want.create({ locationId, cognitoSub: userId });
    return res.data ?? null;
  } catch (err) {
    console.error("WANT登録エラー:", err);
    return null;
  }
};

/** 行きたいを外す */
export const unwantLocation = async (wantId: string): Promise<boolean> => {
  if (!wantModelReady()) return false;
  try {
    await client.models.Want.delete({ id: wantId });
    return true;
  } catch (err) {
    console.error("WANT削除エラー:", err);
    return false;
  }
};
