import S3 from 'aws-sdk/clients/s3';
import {
  awsBucketRegion as region,
  AwsBucketAccessKeyId as accessKeyId,
  awsBucketSecretAccessKey as secretAccessKey,
  awsBucketName as bucketName,
} from './config';

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
