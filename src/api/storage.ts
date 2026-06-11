import { uploadData } from "aws-amplify/storage";

const REGION = "ap-northeast-1";

/** 画像を S3 にアップロードして公開URLを返す */
export const uploadImage = async (file: File): Promise<string> => {
  const uniqueId = crypto.randomUUID();
  const key = `public/picture-submissions/${uniqueId}-${file.name}`;
  await uploadData({
    path: key,
    data: file,
    options: { contentType: file.type },
  });
  const bucketName = import.meta.env.VITE_S3_BUCKET_NAME as string;
  return `https://${bucketName}.s3.${REGION}.amazonaws.com/${key}`;
};
