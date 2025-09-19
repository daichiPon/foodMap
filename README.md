# Food Map Webアプリ

React + TypeScript + Vite で作成した Webアプリ(PWA化)です。

- 公開URL: [https://food-map-lime.vercel.app](https://food-map-lime.vercel.app)
- 機能
  - ログイン機能
  - 店舗の位置登録
  - 地図上で現在地&登録地点のピン表示
  - 登録した店データを検索（カテゴリー・金額・ユーザ）単位

- 初回ログイン時位置情報が取得できないとき
  - iphoneで現在地を押しても位置情報を取得できない場合は、設定→リセット→位置情報とプライバシーをリセットしてください

### 使用技術・ライブラリ

フロントエンド: React, TypeScript, Vite
バックエンド: AWS Amplify (GraphQL API, Cognito 認証, Lambda, DynamoDB, s3)
デプロイ・ホスティング: Vercel
地図: MapBox
外部API連携: HotPepperグルメAPI（現在地付近の店舗データ取得用）

## 開発方法

1. プロジェクトを`git clone`
2. `npm run dev`

### DynamoDBにフィールドを追加する方法

1. `data/resource.ts`と`amplify/api/schema.graphql`にフィールドもしくはテーブルを追加
2. amplify環境にデプロイ
   ```
   npx ampx sandbox
   ```

### DynamoDBに追加したフィールドをフロントで取得する方法

1. クライアントコードの自動生成(`src/graphql/queries.ts`、`src/graphql/mutations.ts`、`src/models/Location.ts` などに新しいフィールドが反映)
   ```
   npx ampx generate graphql-client-code
   ```
2. `src/graphql/mutations.ts `、 `queries.ts` に新しいフィールドを手動で追記（必要な場合のみ）

3. `src/amplify_outputs.json` の更新（自動生成されない場合は、バックエンドの最新 `amplify_outputs.json` をコピーして上書き）

   ```
   copy amplify_outputs.json src/amplify_outputs.json
   ```

   これで TypeScript 型も更新され、`client.models.Location.list()` で Locationフィールド が取得できるようになる

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
