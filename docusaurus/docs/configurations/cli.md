---
id: cli
title: CLI
sidebar_label: CLI
---

To start muil cli run:

```
yarn muil-cli [options]
```

or

```
npm run muil-cli -- [options]
```

> To use options with npm run `npm run muil -- <args>`. [See here](https://docs.npmjs.com/cli/run-script)

## Login

Login to muil service

```
Usage: muil-cli login [options]

Login to Muil

Options:
  -u --user <user>  Username
  -p --pass <pass>  Password
  -h, --help        output usage information
```

## Logout

Logout from muil service

```
Usage: muil-cli logout [options]

Logout from Muil

Options:
  -h, --help  output usage information
```

## Publish

This command builds all templates and uploads to muil

```
Usage: muil-cli publish [options]

Publish email templates

Options:
  -d --templatesDirectory <templatesDirectory>  Templates root directory (default: "./templates")
  -b --branch <branch>                          templates branch (default: "master")
  -e --templatesExtension <templatesExtension>  comma separated list of templates path (default: "template.js")
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

## Api Keys

Using this command you can:

- Create a new api key
- Enable/Disable keys

```
Usage: muil-cli apikey [options]

API keys management

Options:
  -h, --help  output usage information
```

> API keys are useful to send emails through your server. [Read More.](api/authorization.md#authorized-request-using-api-key)
