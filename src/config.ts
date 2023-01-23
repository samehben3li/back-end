import * as dotenv from 'dotenv';

dotenv.config();

export const mongoURI = process.env.MONGO_URI || '';
export const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || 'defaultTokenSecret';
export const port = process.env.PORT || 3000;
export const becryptSalt = Number(process.env.BCRYPT_SALT) || 10;
export const awsBucketRegion = process.env.AWS_BUCKET_REGION;
export const AwsBucketAccessKeyId = process.env.AWS_BUCKET_ACCESS_KEY;
export const awsBucketSecretAccessKey = process.env.AWS_BUCKET_SECRET_KEY;
export const awsBucketName = process.env.AWS_BUCKET_NAME;
export const awsCloudFrontURL = process.env.AWS_CLOUD_FRONT_URL;
