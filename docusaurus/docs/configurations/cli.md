---
id: cli
title: CLI
sidebar_label: CLI
---

## Login

login to muil service

```
Usage: muil-cli login [options]

Options:

-u, --user                    Username
-p, --password                password
```

## Logout

logout from muil service

```
Usage: muil-cli logout
```

## Publish

build templates and upload to muil

```
Usage: muil-cli publish [options]

Options:

-d, --templatesDirectory      templates root directory, default: './templates'
-b, --branch                  templates branch, default: master
```

## Unpublish

clean branch

```
Usage: muil-cli unpublish [options]

Options:

-b, --branch                  templates branch, default: master
```
