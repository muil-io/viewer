const { getOptions } = require('loader-utils');
const { validate } = require('schema-utils');
const { uploadAsset } = require('../services/api');

const schema = {
  type: 'object',
  properties: {
    token: {
      type: 'string',
    },
  },
};

module.exports = async function () {
  const options = getOptions(this) || {};
  validate(schema, options, 'Muil Asset Loader');

  const url = await uploadAsset({ token: options.token, assetPath: this.resourcePath });
  return `export default ${JSON.stringify(url)}`;
};
