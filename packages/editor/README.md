Visit [Muil Docs.](https://docs.muil.io)

## Automate Installation

Get started using the automatic command line tool. This command installs and adds everything you need to get start with Muil.

Inside your root directory run:

```
npx -p @muil/cli muil-cli init
```

## Manual Installation

To get start with Muil you will need:

1. Run this line inside you root directory:

```
npm install --dev @muil/editor`
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

## Usage

To start muil editor run:

```
npm run muil
```

or

```
yarn muil
```

## Editor Options

```
Usage: muil [options]

Options:

-p, --port                    Editor port, default: 8000
-d, --templatesDirectory      Templates root directory, default: './templates'
```