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
generated-token
```

## Authorized Request using token

To each request to the server add an `Authorization` header:

```
Authorization: Bearer [generated-token]
```

## Authorized Request using api key

If you would like to [send an email](sendingEmail.md) you can use api key instead.

- [create an api key](../configurations/cli#api-keys)
- attach api key to email request header

```
x-api-key: [generate-api-key]
```
