import { defineFunction } from "@aws-amplify/backend";

export const myApiFunction = defineFunction({
  name: "hotpepperApi",
  entry: "./index.ts", // Lambda の実装ファイル
  environment: {
    HOTPEPPER_KEY: "b1a0ddfbb1816bc4", //←いつか隠します
  },
  timeoutSeconds: 30,
});
