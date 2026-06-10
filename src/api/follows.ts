import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import type { UserType } from "./user";

const client = generateClient<Schema>({ authMode: "userPool" });

export type FollowType = Schema["Follow"]["type"];

/** 自分がフォローしているユーザー(Follow レコード) */
export const fetchFollowing = async (userId: string): Promise<FollowType[]> => {
  try {
    const res = await client.models.Follow.list({
      filter: { followerId: { eq: userId } },
      limit: 1000,
    });
    return res.data || [];
  } catch (err) {
    console.error("フォロー取得エラー:", err);
    return [];
  }
};

/** ユーザーをフォローする */
export const followUser = async (myId: string, targetId: string): Promise<FollowType | null> => {
  try {
    const res = await client.models.Follow.create({ followerId: myId, followeeId: targetId });
    return res.data ?? null;
  } catch (err) {
    console.error("フォロー登録エラー:", err);
    return null;
  }
};

/** フォロー解除 */
export const unfollowUser = async (followId: string): Promise<boolean> => {
  try {
    await client.models.Follow.delete({ id: followId });
    return true;
  } catch (err) {
    console.error("フォロー解除エラー:", err);
    return false;
  }
};

/** ユーザー名で検索 */
export const searchUsers = async (keyword: string): Promise<UserType[]> => {
  try {
    const res = await client.models.User.list({
      filter: { username: { contains: keyword } },
      limit: 50,
    });
    return res.data || [];
  } catch (err) {
    console.error("ユーザー検索エラー:", err);
    return [];
  }
};

/** 全ユーザーを id → User の Map で取得（表示名解決用） */
export const fetchUserMap = async (): Promise<Map<string, UserType>> => {
  const map = new Map<string, UserType>();
  try {
    const res = await client.models.User.list({ limit: 1000 });
    (res.data || []).forEach((u) => map.set(u.id, u));
  } catch (err) {
    console.error("ユーザー一覧取得エラー:", err);
  }
  return map;
};
