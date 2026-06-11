import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>({ authMode: "userPool" });

export type LocationType = Schema["Location"]["type"];

export type LocationUpdateInput = {
  id: string;
  name?: string;
  description?: string | null;
  category?: string | null;
  priceRange?: string | null;
  imageUrl?: string | null;
};

/** 投稿を更新 */
export const updateLocation = async (
  input: LocationUpdateInput
): Promise<LocationType | null> => {
  try {
    const res = await client.models.Location.update(input);
    if (res.errors) {
      console.error("投稿更新エラー:", res.errors);
      return null;
    }
    return res.data ?? null;
  } catch (err) {
    console.error("投稿更新エラー:", err);
    return null;
  }
};

/** 投稿を削除 */
export const deleteLocation = async (id: string): Promise<boolean> => {
  try {
    const res = await client.models.Location.delete({ id });
    if (res.errors) {
      console.error("投稿削除エラー:", res.errors);
      return false;
    }
    return true;
  } catch (err) {
    console.error("投稿削除エラー:", err);
    return false;
  }
};
