# Kanban Board


> POST /register


Req.body:
```json
  {
    "email": "<email>",
    "password": "<password>"
  }
```

Response (200 - OK)
```json
  {
    "id": "<id>",
    "email": "<email>",
  }
```

Response (400 - Bad Request)
```json
  {
    "message": "<validation error message>"
  }
```

Response (500 - Internal Server Error)
```json
  {
    "message": "Internal Server Error"
  }
```

> POST /login

Req.body:
```json
  {
    "email": "<email>",
    "password": "<password>"
  }
```

Response (200 - OK)
```json
  {
    "access_token": "<access_token>"
  }
```

Response (400 - Bad Request)
```json
  {
    "message": "<validation error message>"
  }
```

Response (500 - Internal Server Error)
```json
  {
    "message": "Internal Server Error"
  }
```

> GET /task

Req.headers:
```json
  {
    "access_token": "<access_token>"
  }
```

Response (200 - OK)
```json
  [
    {
      "id": "<id>",
      "title": "<title>",
      "category": "<category>",
      "UserId": "<userId>",
      "User": "<email>"
    }
  ]
```

Response (500 - Internal Server Error)
```json
  {
    "message": "Internal Server Error"
  }
```

> POST /task/create

Req.headers:
```json
  {
    "access_token": "<access_token>"
  }
```

Req.body:
```json
  {
    "title": "<title>",
    "category": "<category>"
  }
```

Response (200 - OK)
```json
  [
    {
      "id": "<id>",
      "title": "<title>",
      "category": "<category>",
      "UserId": "<userId>"
    }
  ]
```

Response (400 - validation error)
```json
  {
    "message": "<validation error message>"
  }
```

Response (500 - Internal Server Error)
```json
  {
    "message": "Internal Server Error"
  }
```

>GET /task/:id
Req.headers:
```json
  {
    "access_token": "<access_token>"
  }
```

Req.params:
```json
  {
    "id": "<id>"
  }
```
Response (200 - OK)
```json
  [
    {
      "id": "<id>",
      "title": "<title>",
      "category": "<category>",
      "UserId": "<userId>"
    }
  ]
```

Response (500 - Internal Server Error)
```json
  {
    "message": "Internal Server Error"
  }
```

>PATCH /task/edit/:id
Req.headers:
```json
  {
    "access_token": "<access_token>"
  }
```

Req.params:
```json
  {
    "id": "<id>"
  }
```

Req.body:
```json
  {
    "title": "<title>",
    "category": "<category>"
  }
```

Response (200 - OK)
```json
  [
    {
      "id": "<id>",
      "title": "<title>",
      "category": "<category>",
      "UserId": "<userId>"
    }
  ]
```

Response (500 - Internal Server Error)
```json
  {
    "message": "Internal Server Error"
  }
```

>DELETE /task/delete/:id
Req.headers:
```json
  {
    "access_token": "<access_token>"
  }
```

Req.params:
```json
  {
    "id": "<id>"
  }
```

Response (200 - OK)
```json
  1
```

Response (500 - Internal Server Error)
```json
  {
    "message": "Internal Server Error"
  }
```

> POST /Oauth

Req.body:
``` json
  {
    "token": "<access_token>"
  }
```

Response (200 - OK)
```json
  {
    "access_token": "<access_token>"
  }
```