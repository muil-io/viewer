---
id: sendingEmail
title: Sending Email
sidebar_label: Sending Email
---

> Don't forget to add authorization header. [Read More.](authorization.md)

## API

> POST: <br>https://us-central1-muil-io.cloudfunctions.net/templates/[projectID]/[branch]/[templateID]/email

`Branch is optional`

## Parameters

| Name        | Type                     | Description                                                                                                                                                                                    |
| ----------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| subject     | String                   | Subject of the email                                                                                                                                                                           |
| to          | String, Array of Strings | Can be either:<br> string `"example@muil.io"` <br> string with semicolon delimiter `"example1@muil.io;example2@muil.io"` <br> array of strings `["example1@muil.io", "example2@muil.io"]` <br> |
| cc          | String, Array of Strings | Same as `to`                                                                                                                                                                                   |
| bcc         | String, Array of Strings | Same as `to`                                                                                                                                                                                   |
| props       | Object                   | Template dynamic props                                                                                                                                                                         |
| attachments | Array                    | Each item can include:<br> `templateId` - a different template <br> `type`: generate template as html/pdf/png<br>`props`: the template's dynamic props                                         |

### Example

```
{
    "subject": "Test Subject",
    "to": "email1@muil.io",
    "cc": "email2@muil.io",
    "bcc": "email3@muil.io",
    "props": {
        // template dynamic props
    }
}
```

### Attachments Example

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

> NOTE: Attachments must be one of the following: HTML/PDF/PNG

## Limitations

[Read More.](limitations/fonts.md)
