---
id: generatingImage
title: Generating Image
sidebar_label: Generating Image
---

> Don't forget to add authorization header. [Read More.](authorization.md)

## API

> POST: https://us-central1-muil-io.cloudfunctions.net/templates/[templateID]/png

or a specific branch

> POST: https://us-central1-muil-io.cloudfunctions.net/templates/[branch]/[templateID]/png

## PNG

Request:

```
{
    "props": {
        // template dynamic props
    }
}
```
