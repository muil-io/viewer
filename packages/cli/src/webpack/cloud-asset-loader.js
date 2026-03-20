/* eslint-disable camelcase */
const fs = require('fs');
const { promisify } = require('util');
const md5 = require('crypto-js/md5');
const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const Azure = require('@azure/storage-file');
const { Storage } = require('@google-cloud/storage');

const readFile = promisify(fs.readFile);

module.exports = async function () {
  const options = this.getOptions() || {};

  if (options.aws) {
    const { aws_access_key_id: accessKeyId, aws_secrete_access_key: secretAccessKey, aws_bucket_name } = options.aws;

    try {
      const clientConfig = accessKeyId && secretAccessKey
        ? { credentials: { accessKeyId, secretAccessKey } }
        : {};
      const s3 = new S3Client(clientConfig);

      const file = await readFile(this.resourcePath);
      const filename = `${md5(this.resourcePath)}.${this.resourcePath.split('.').pop()}`;

      const upload = new Upload({
        client: s3,
        params: { Bucket: aws_bucket_name, Body: file, Key: filename },
      });
      const { Location: url } = await upload.done();

      return `export default ${JSON.stringify(url)}`;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  if (options.gcs) {
    const { gcs_key_file_path, gsc_bucket_name } = options.gcs;

    try {
      const storage = new Storage({ keyFilename: gcs_key_file_path });

      const bucket = await storage.bucket(gsc_bucket_name);
      const filename = `${md5(this.resourcePath)}.${this.resourcePath.split('.').pop()}`;

      const [
        {
          metadata: { mediaLink },
        },
      ] = await bucket.upload(this.resourcePath, {
        destination: filename,
      });

      return `export default ${JSON.stringify(mediaLink)}`;
    } catch (error) {
      return error;
    }
  }

  if (options.azure) {
    console.log('IN AZURE');
    const { SharedKeyCredential, FileURL, Aborter, DirectoryURL, ShareURL, StorageURL, ServiceURL } = Azure;

    const { azure_account_name, azure_account_key, azure_share_name, azure_dir_name = '' } = options.azure;

    try {
      if (!azure_account_name || !azure_account_key || !azure_share_name)
        throw new Error('azure_account_name, azure_account_key, azure_share_name are required');

      const sharedKeyCredential = new SharedKeyCredential(azure_account_name, azure_account_key);

      const pipeline = StorageURL.newPipeline(sharedKeyCredential);

      const serviceURL = new ServiceURL(`https://${azure_account_name}.file.core.windows.net`, pipeline);

      const shareURL = ShareURL.fromServiceURL(serviceURL, azure_share_name);

      const directoryURL = DirectoryURL.fromShareURL(shareURL, azure_dir_name);

      const filename = `${md5(this.resourcePath)}.${this.resourcePath.split('.').pop()}`;

      const file = await readFile(this.resourcePath);

      const fileURL = await FileURL.fromDirectoryURL(directoryURL, filename);

      await fileURL.create(Aborter.none, file.length);
      await fileURL.uploadRange(Aborter.none, file, 0, file.length);

      return `export default ${JSON.stringify(fileURL.url)}`;
    } catch (error) {
      return error;
    }
  }
};
