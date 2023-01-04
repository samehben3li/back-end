import S3 from 'aws-sdk/clients/s3';
import * as dotenv from 'dotenv';

dotenv.config();

const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY;
const secretAccessKey = process.env.AWS_BUCKET_SECRET_KEY;
const bucketName = process.env.AWS_BUCKET_NAME || '';

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
});

const generateUploadURL = async (imgName: string) => {
  const params = {
    Bucket: bucketName,
    Key: imgName,
  };
  const uploadURL = await s3.getSignedUrlPromise('putObject', params);
  return uploadURL;
};

export default generateUploadURL;
