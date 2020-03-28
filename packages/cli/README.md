Visit [Muil Docs.](https://docs.muil.io)

## Login

login to muil service

```
Usage: muil login [options]

Login to Muil

Options:
  -u --user <user>  Username
  -p --pass <pass>  Password
  -h, --help        output usage information
```

## Logout

logout from muil service

```
Usage: muil logout [options]

Logout from Muil

Options:
  -h, --help  output usage information
```

## Publish

build templates and upload to muil

```
Usage: muil publish [options]

Publish email templates

Options:
  -d --templatesDirectory <templatesDirectory>  Templates root directory (default: "./templates")
  -b --branch <branch>                          templates branch (default: "master")
  -e --templatesExtension <templatesExtension>  comma separated list of templates path (default: "template.js")
  -h, --help                                    output usage information
```

> This action will clear all templates in this branch and upload the new templates!

## Unpublish

clean branch

```
Usage: muil unpublish [options]

Unpublish email templates

Options:
  -b --branch <branch>  templates branch, default: master
  -h, --help            output usage information
```

> This action will clear all templates in this branch!
