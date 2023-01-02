import S3 from 'aws-sdk/clients/s3';
import fs from 'fs';
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
});

const uploadFile = (path: string, fileName: string) => {
  const fileContent = fs.readFileSync(path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileContent,
    Key: fileName,
    ContentType: 'image/svg+xml',
  };
  return s3.upload(uploadParams).promise();
};

export default uploadFile;
