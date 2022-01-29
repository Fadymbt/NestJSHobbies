## Description

A simple API controlling user and hobby data.

## Installation

### Firstly, add the .env file to the project directory. then run:

```bash
$ npm install
```

## Running the app

```bash
# run the api
$ npm run start
```

## Test

```bash
# unit tests
$ npm run test

# to run specific tests
$ npm run test:watch
```

# API ENDPOINTS

## Root Endpoint

### GET: localhost:3000/

Response:

```
"Hello Livello!"
```

## User Endpoints

Hobby model structure:

```
{
    "_id": String,
    "name": String,
    "hobbies":[String]
}
```

"\_id" is the user ID.\
"name" is the name of the user.\
"hobbies" attribute in the user model holds a list of the user's hobby IDs.

<br />

### POST: localhost:3000/user/addUser

Request Body:

```
{
    "name": String
}
```

Response:

```
{
    "_id": String,
    "name": String,
    "hobbies":[String]
}
```

<br />

### GET: localhost:3000/user/allUsers

Response:

```
{
    users: [
        {
            "_id": String,
            "name": String,
            "hobbies":[String]
        }
    ]
}
```

<br />

### PATCH: localhost:3000/user/changeName

Request Body:

```
{
    "id": String,
    "name": String
}
```

Response:

```
{
    "_id": String,
    "name": String,
    "hobbies":[String]
}
```

<br />

### DELETE: localhost:3000/user/deleteUser

Request Body:

```
{
    "id": String
}
```

Response:

```
{
    "message": String
}
```

<br />

## Hobby Endpoints

Hobby model structure:

```
{
    "_id": String,
    "passion_level": String,
    "name": String,
    "year": String,
}
```

"\_id" is the user ID.\
"passion_level" is how much the user likes the hobby (Values can only by: "Very-High", "High", "Medium", or "Low").\
"name" is the name of the hobby.\
"year" is the year the user started the hobby (Value can only be in a realistic range between 1920 - Current year).

<br />

### POST: localhost:3000/hobby/addHobby

Request Body:

```
{
    "user_id": String,
    "passion_level": String,
    "hobby_name": String,
    "year": String
}
```

Response:

```
{
    "hobby": {
        "_id": String,
        "passion_level": String,
        "name": String,
        "year": String,
    }
}
```

<br />

### GET: localhost:3000/hobby/allHobbies

Response:

```
{
    "hobbies": [
        {
            "_id": String,
            "passion_level": String,
            "name": String,
            "year": String
        }
    ]
}
```

<br />

### GET: localhost:3000/hobby/userHobbies/:id

Response:

```
{
    "hobbies": [
        {
            "_id": String,
            "passion_level": String,
            "name": String,
            "year": String
        }
    ]
}
```

<br />

### PATCH: localhost:3000/hobby/changePassionLevel

Request Body:

```
{
    "id": String,
    "new_passion_level": String
}
```

Response:

```
{
    "hobby": {
        "_id": String,
        "passion_level": String,
        "name": String,
        "year": String
    }
}
```

<br />

### DELETE: localhost:3000/hobby/deleteHobby

Request Body:

```
{
    "id": "61f281a5e33fd0079ff28da2"
}
```

Response:

```
{
    "message": String
}
```

<br />
