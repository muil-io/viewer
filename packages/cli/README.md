Visit [Muil Docs.](https://docs.muil.io)

## Run Muil CLI

To start muil cli run:

```
yarn muil-cli [options]
```

or

```
npm run muil-cli -- [options]
```

> To use options with npm run `npm run muil -- <args>`. [See here](https://docs.npmjs.com/cli/run-script)

## Initialization

Before you can publish templates you should add `.npmrc` file to your root folder:

```json
{
  "host": "YOUR_HOST_ADDRESS",
  "apiKey": "YOUR_API_KEY"
}
```

`host` - is optional - if you are using our SaaS option you can remove it. if you are using the on-premise solution you should change it to the address of the server.

`apiKey` - is required - go to the portal and create a new api key and paste it here.

## Publish

This command builds all templates and uploads to muil

```
Usage: muil-cli publish [options]

Publish email templates

Options:
  -d --templatesDirectory <templatesDirectory>  Templates root directory (default: "./templates")
  -b --branch <branch>                          templates branch (default: "master")
  -h, --help                                    output usage information
```

> This action will clear all templates in this branch and upload the new templates!

## Unpublish

This command cleans the branch from all templates

```
Usage: muil-cli unpublish [options]

Unpublish email templates

Options:
  -b --branch <branch>  templates branch, default: master
  -h, --help            output usage information
```

> This action will clear all templates in this branch!
