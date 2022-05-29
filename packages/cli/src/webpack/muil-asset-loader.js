import { getOptions } from 'loader-utils';
import { validate } from 'schema-utils';
import { uploadAsset } from '../services/api';

const schema = {
  type: 'object',
  properties: {
    token: {
      type: 'string',
    },
  },
};

export default async function () {
  const options = getOptions(this) || {};
  validate(schema, options, 'Muil Asset Loader');

  const url = await uploadAsset({ token: options.token, assetPath: this.resourcePath });
  return `export default ${JSON.stringify(url)}`;
}
