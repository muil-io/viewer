---
id: generatingPdf
title: Generating PDF
sidebar_label: Generating PDF
---

> Don't forget to add authorization header. [Read More.](authorization.md)

## API

> POST: https://us-central1-muil-io.cloudfunctions.net/templates/[templateID]/pdf

or a specific branch

> POST: https://us-central1-muil-io.cloudfunctions.net/templates/[branch]/[templateID]/pdf

## PDF

Request:

```
{
    "props": {
        // template dynamic props
    }
}
```
