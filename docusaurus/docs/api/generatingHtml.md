---
id: generatingHtml
title: Generating HTML
sidebar_label: Generating HTML
---

> Don't forget to add authorization header. [Read More.](authorization.md)

## API

> POST: https://us-central1-muil-io.cloudfunctions.net/templates/[templateID]/html

or a specific branch

> POST: https://us-central1-muil-io.cloudfunctions.net/templates/[branch]/[templateID]/html

## HTML

Request:

```
{
    "subject": "Test Subject",
    "to": "email@muil.io",
    "props": {
        // template dynamic props
    }
}
```
