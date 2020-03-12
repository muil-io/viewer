---
id: authorization
title: Authorization
sidebar_label: Authorization
---

Before make any request to server, you should make a login request to get a token:

## API

> POST: https://us-central1-muil-io.cloudfunctions.net/auth/login

Request:

```
{
	"email": "email@muil.io",
	"password": "password"
}
```

Response:

```
generated-token-123
```

## Authorized Request

To each request to the server add a `Authorization` header:

```
Authorization: Bearer [generated-token-123]
```
