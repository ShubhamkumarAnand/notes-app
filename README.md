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

## API Endpoints

Your API should implement the following endpoints:

### Authentication Endpoints

- **POST** _/api/auth/sign-up_: create a new user account.
- **POST** _/api/auth/sign-in_: log in to an existing user account and receive an access token.

### Note Endpoints

- **GET** _/api/notes_: get a list of all notes for the authenticated user.
- **GET** _/api/notes/:id_: get a note by ID for the authenticated user.
- **POST** _/api/notes_: create a new note for the authenticated user.
- **PUT** _/api/notes/:id_: update an existing note by ID for the authenticated user.
- **DELETE** _/api/notes/:id_: delete a note by ID for the authenticated user.
- **POST** _/api/notes/:id/share_: share a note with another user for the authenticated user.
- **GET** _/api/search?q=:query_: search for notes based on keywords for the authenticated user.
