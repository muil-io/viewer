---
id: customWebpack
title: Custom Webpack Config
sidebar_label: Custom Webpack Config
---

## Custom Webpack Config

To create a custom webpack configuration just create `.muil/config.js` at the root project:

```
root directory
├───.muil
|   └───config.js
├───src
└───templates
```

The `config.js` file will look like this:

```
module.exports = {
  webpack: config => config,
};
```

> Don't return a different config object! Just modify it as you need

##### Example

```
module.exports = {
  webpack: config => {
      config.module.rules.push({
        test: /\.(bmp|gif|jpe?g|png)?$/,
        use: ["url-loader"]
      });
  },
};
```
