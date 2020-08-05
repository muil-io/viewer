/* eslint-disable camelcase */
import { getOptions } from 'loader-utils';
import fs from 'fs';
import { promisify } from 'util';
import AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

const readFile = promisify(fs.readFile);

export default async function () {
  const options = getOptions(this) || {};

  if (options.aws) {
    const { aws_access_key_id: accessKeyId, aws_secrete_access_key: secretAccessKey, aws_bucket_name } = options.aws;

    const s3 = new AWS.S3({
      accessKeyId,
      secretAccessKey,
    });

    const file = await readFile(this.resourcePath);
    const { Location: url } = await s3
      .upload({ Bucket: aws_bucket_name, Body: JSON.stringify(file), Key: uuid() })
      .promise();

    return `export default ${JSON.stringify(url)}`;
  }
}
