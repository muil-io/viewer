---
id: sendingEmail
title: Sending Email
sidebar_label: Sending Email
---

> Don't forget to add authorization header. [Read More.](authorization.md)

## API

> POST: https://us-central1-muil-io.cloudfunctions.net/templates/[templateID]/email

or a specific branch

> POST: https://us-central1-muil-io.cloudfunctions.net/templates/[branch]/[templateID]/email

## Email

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

## Attachments

You can add attachments to the email based on other templates:

```
{
    "subject": "Test Subject",
    "to": "email@muil.io",
    "props": {
        // template dynamic props
    },
    attachments: [{
      "templateId": // templateID
      "type": [html/pdf/png]
      "props": {
        // template dynamic props
      }
    }]
}
```

> NOTE: Attachments can be HTML/PDF/PNG

## Limitations

[Read More.](limitations/fonts.md)
