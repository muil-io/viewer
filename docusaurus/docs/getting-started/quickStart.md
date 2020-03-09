---
id: quickStart
title: Quick Start Guide
sidebar_label: Quick Start Guide
---

## Automate Installation

Get started using the automatic command line tool. This command installs and adds everything you need to get start with Muil.

Inside your root directory run:

```
npx -p @muil/cli muil-cli init
```

## Verifying Installation

Your root directory will now contains a structure similar to:

```
root directory
├───src
│   ├───components
│   │   ├───Component1.js
│   │   ├───...
│   │   └───ComponentN.js
└───templates
    ├───Button.template.js
    └───Welcome.template.js
```

And the package.json will looks like:

```
 "scripts": {
    ...
    "muil": "muil-editor",
    "muil-cli": "muil-cli"
  },
```

## Run Muil Editor

See [Run Muil Editor.](run.md)
