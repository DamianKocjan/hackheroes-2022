import * as aws from "aws-sdk";
import { env } from "../env/server.mjs";

export const BUCKET_NAME = "thisplace-hackheroes";

aws.config.update({
  accessKeyId: env.AMAZON_WS_ACCESS_KEY_ID,
  secretAccessKey: env.AMAZON_WS_SECRET_ACCESS_KEY,
  region: env.AMAZON_WS_REGION,
  signatureVersion: "v4",
});

aws.config.credentials = new aws.CognitoIdentityCredentials({
  IdentityPoolId: env.AMAZON_WS_IDENTITY_POLL_ID,
});

export const AWS = aws;

export const s3 = new aws.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: BUCKET_NAME },
});
