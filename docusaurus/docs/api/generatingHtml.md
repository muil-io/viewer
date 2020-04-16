---
id: generatingHtml
title: Generating HTML
sidebar_label: Generating HTML
---

> Don't forget to add authorization header. [Read More.](authorization.md)

## API

> GET/POST:<br> https://us-central1-muil-io.cloudfunctions.net/v1/templates/[projectID]/[branch]/[templateID]?type=html

`Branch is optional`<br>
`Default type is html`

## Parameters

| Name  | Type   | Description            |
| ----- | ------ | ---------------------- |
| props | Object | Template dynamic props |

### Example

Request:

```
{
    "props": {
        // template dynamic props
    }
}
```
