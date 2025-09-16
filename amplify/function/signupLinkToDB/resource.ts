import { defineFunction } from "@aws-amplify/backend";

export const signupLinkToDB = defineFunction({
  name: "signupLinkToDB",
  entry: "./index.ts",
  environment: {
    TABLE_NAME: "User-6no7ty6ug5f2jmfci4crulr7de-NONE", // DynamoDB テーブル名
  },
  timeoutSeconds: 10,
});
