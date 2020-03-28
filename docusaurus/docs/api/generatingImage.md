---
id: generatingImage
title: Generating Image
sidebar_label: Generating Image
---

> Don't forget to add authorization header. [Read More.](authorization.md)

## API

> GET/POST:<br> https://us-central1-muil-io.cloudfunctions.net/templates/[projectID]/[branch]/[templateID]?type=png

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
