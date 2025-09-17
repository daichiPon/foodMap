import { PostConfirmationTriggerEvent, Context } from "aws-lambda";
import * as AWS from "aws-sdk";

const docClient = new AWS.DynamoDB.DocumentClient();

export const handler = async (event: PostConfirmationTriggerEvent, context: Context) => {
  console.log("handlerの起動");
  const now = new Date().toISOString();

  const params = {
    TableName: "User-6no7ty6ug5f2jmfci4crulr7de-NONE",
    Item: {
      id: event.request.userAttributes.sub,
      cognitoSub: event.request.userAttributes.sub,
      email: event.request.userAttributes.email,
      username: event.userName,
      owner: event.request.userAttributes.sub,
      createdAt: now,
      updatedAt: now,
    },
  };

  try {
    await docClient.put(params).promise();
    console.log(`User saved: ${JSON.stringify(params.Item)}`);
  } catch (err) {
    console.error("DynamoDB put error", err);
    throw err;
  }

  return event; // PostConfirmation Lambda は event を返す
};
