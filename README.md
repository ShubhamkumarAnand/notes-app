# Notes Application

## Project Overview

- To build a secure and scalable RESTful API that allows users to create, read, update, and delete notes.
- The application should also allow users to share their notes with other users and search for notes based on keywords.

## Technical Requirements

- Implement a RESTful API using a framework of your choice (e.g. Express, DRF, Spring).
- Use a database of your choice to store the data (preferably MongoDB or PostgreSQL).
- Use any authentication protocol and implement a simple rate limiting and request throttling to handle high traffic.
- Implement search functionality to enable users to search for notes based on keywords. ( preferably text indexing for high performance )
- Write unit tests and integration tests your API endpoints using a testing framework of your choice.

## Command for Setup

```bash
# I've used bun as a package manager

## Setup
bun install

bun db:generate # generate prisma schema
bun db:push # pushsearch
  ing the schema and creating a sqlite db

## Starting the Dev Env
bun dev # Start the server
bun db:studio # prisma studio
```

## API Endpoints

Your API should implement the following endpoints:

### Authentication Endpoints

- **POST** _/api/auth/sign-up_: create a new user account.

 ```json
{
  "username": "imskanand",
  "email": "abc@gmail.com",
  "password": "123"
}
 ```

- **POST** _/api/auth/sign-in_: log in to an existing user account and receive an access token.

### Note Endpoints

> NOTE **Put the token you get from the sign-in/sign-up in these routes because these routes are authorized only**

- **GET** _/api/notes_: get a list of all notes for the authenticated user.
- **GET** _/api/notes/:id_: get a note by ID for the authenticated user.
- **POST** _/api/notes_: create a new note for the authenticated user.

```json
{
  "noteContent": "You are the champion!"
}
```

- **PUT** _/api/notes/:id_: update an existing note by ID for the authenticated user.

```json
{
  "noteContent": "Hello Bro!!"
}
```

- **DELETE** _/api/notes/:id_: delete a note by ID for the authenticated user.
- **GET** _/api/search?q=:query_: search for notes based on keywords for the authenticated user.
