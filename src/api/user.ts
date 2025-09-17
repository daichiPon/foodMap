import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>({ authMode: "userPool" });

export interface UserType {
  id: string;
  cognitoSub: string | null;
  email: string;
  username: string;
  profileImage: string | null;
  owner: string | null;
  createdAt: string;
  updatedAt: string;
}

export const fetchUser = async (userId: string): Promise<UserType | null> => {
  console.log("userId", userId);
  try {
    const res = await client.models.User.get({ id: userId });
    console.log("res", res);
    if (!res.data) return null;
    return res.data;
  } catch (err) {
    console.error("ユーザー取得エラー:", err);
    return null;
  }
};
