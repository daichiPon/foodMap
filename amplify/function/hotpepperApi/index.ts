import type { APIGatewayProxyHandler } from "aws-lambda";
import fetch from "node-fetch";

export const handler: APIGatewayProxyHandler = async (event) => {
  const { lat, lng } = event.queryStringParameters || {};
  const apiKey = process.env.HOTPEPPER_KEY;
  console.log("apikey", apiKey);

  const url =
    `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/` +
    `?key=${apiKey}&format=json&lat=${lat}&lng=${lng}&range=2`;

  console.log("url", url);
  const res = await fetch(url);
  console.log("res", res);
  const data = await res.text();
  console.log("data", data);

  return {
    statusCode: 200,
    body: data,
    headers: {
      "Content-Type": "application/json", //レスポンスの形式をJSONに設定
      "Access-Control-Allow-Origin": "*", //どのドメインからも呼び出せるようにした
      "Access-Control-Allow-Methods": "GET,OPTIONS", //GetとOpttionsのHTTPメソッドを許可
      "Access-Control-Allow-Headers": "Content-Type", //Content-Type ヘッダーの送信を許可
    },
  };
};
