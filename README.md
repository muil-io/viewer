#Installation

## Automatic setup

Run inside the directory:

`npx -p @muil/cli muil-cli init`

## Manual setup

Run inside the directory:

`npm install --dev @muil/editor`
or
`yarn add --dev @muil/editor`

Add to package.json:

```
 "scripts": {
    ...
    "muil": "muil-editor",
    "muil-cli": "muil-cli"
  },
```

Add templates:

```
root
├───src
│   ├───components
│   │   ├───Component1.js
│   │   ├───Component2.js
│   │   └───Component3.js
├───templates
│   ├───Template1.js
│   ├───Template2.js
│   └───Template3.js
```

# Usage

Run editor with `npm run muil` or `yarn muil` to edit your email.

# Cli

- Login - `yarn muil-cli login` - login to muil service

  ```
  -u --user username
  -p --password password
  ```

- Logout - `yarn muil-cli login` - logout from muil service

- Publish - `yarn muil-cli publish` - build templates and upload to muil

  ```
  -d --templatesDirectory templates root directory, default: './templates'
  -b --branch templates branch, default: master
  ```

- Unpublish - `yarn muil-cli unpublish` - clean branch
  ```
  -b --branch templates branch, default: master
  ```
