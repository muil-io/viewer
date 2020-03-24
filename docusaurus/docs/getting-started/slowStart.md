---
id: slowStart
title: Slow Start Guide
sidebar_label: Slow Start Guide
---

## Manual Installation

To get start with Muil you will need:

1. Run this line inside you root directory:

```
npm install --dev @muil/editor
```

or

```
yarn add --dev @muil/editor
```

2. Add these scripts to package.json:

```
 "scripts": {
    ...
    "muil": "muil-editor",
    "muil-cli": "muil-cli"
  },
```

3. Add templates folder in your root directory

```
root directory
├───src
│   ├───components
│   │   ├───Component1.js
│   │   ├───Component2.js
│   │   └───Component3.js
└───templates
    ├───Template1.js
    ├───Template2.js
    └───Template3.js
```

## Run Muil Editor

See [Run Muil Editor.](run.md)
