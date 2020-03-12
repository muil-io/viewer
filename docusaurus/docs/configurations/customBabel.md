---
id: customBabel
title: Custom Babel Config
sidebar_label: Custom Babel Config
---

## Custom Babel Config

To create a custom babelrc configuration just create `.muil/.babelrc` at the root project:

```
root directory
├───.muil
|   └───.babelrc
├───src
└───templates
```

> The babelrc will override the default configuration!

##### Example

```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": ["babel-plugin-styled-components"]
}
```
