# movie-api-graphql

Simple Movie API using GraphQL, Apollo Server and NodeJS

## APIs

### REST API

REST API is one of the popular methods to create an API.
It is based on the HTTP protocol and uses HTTP methods to define actions.
For example, GET (read), POST (create), PUT (update), and DELETE (delete).
Basically, the API can be called using a URL and depending on the HTTP Methods,
the API performs the action and returns the result.

One of the main disadvantages of REST API is that it is not flexible and URL should be public.
For example, if you want to get a list of users, you need to call the URL `/users`.
If you want to get a list of movies, you need to call the URL `/movies`.
But anyone can call the API and the API will return the result.
It is not flexible and you cannot define what data you want to get.

### GraphQL

GraphQL is a `query language` for APIs.
It is a specification that describes how to communicate between the client and the server.
It provides a complete and understandable description of the data in your API,
gives clients the power to ask for exactly what they need and nothing more,
makes it easier to evolve APIs over time, and enables powerful developer tools.

### GraphQL vs REST API

GraphQL tries to solve problems of REST API.

- `Over-fetching`: Getting unnecessary data
  - GraphQL returns the exact data that you want to get, while REST API returns all the data defined by the backend.
- `Under-fetching`: Need to call multiple endpoints to get the data

  - GraphQL allows you to get all the data you need in a single request, while REST API might have to call multiple endpoints to get the data you want. Caling multiple endpoints can result in a slow response time.

### Try GraphQL online

1. Go to [https://studio.apollographql.com/public/star-wars-swapi/variant/current/]([https://studio.apollographql.com/public/star-wars-swapi/variant/current/])
2. In the Docs section, you can see the list of queries and mutations that you can use.
3. Try queries and mutations using following examples.

```gql
{
  # Get All Films only with total count and each film's title
  allFilms {
    totalCount
    films {
      title
    }
  }

  # Get people with name, hair color, eye color, and birth year
  allPeople {
    people {
      name
      hairColor
      eyeColor
      birthYear
    }
  }
}
```

## Apollo Server

`Apollo Server` is an open-source server, which supports GraphQL specification.
You can use `Apollo Server` just like an NodeJS Server.
If you already have `Express`, `Fastify`, `Hapi`, or `Koa` server, you can use `Apollo Server` on top of your existing server by adding middleware to it.
It does not matter whether you have established the server based on REST API.

## Setup Process

The below process is the setup process of this project.
If you want to create a new project, you can follow the below process.
You will be able to setup your new project with GraphQL and Apollo Server.

### 1. Create a new project

```bash
mkdir <project-name>
cd <project-name>
npm init -y

# For this project:
mkdir movie-api
cd movie-api
npm init -y
```

### 2. Install dependencies

```bash
npm install apollo-server graphql
```

### 3. Install DEV dependencies

```bash
npm install --save-dev nodemon
```

### 4. Create a new file `index.js`

```js
import { ApolloServer, gql } from "apollo-server";

// Shape of the data
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
```

### 5. Add `start` script in `package.json`

```json
{
  "scripts": {
    "start": "nodemon index.js"
  }
}
```

### 6. Run the server

```bash
npm start
```

If you encounter an error saying: Cannot use import statement outside a module
Add `"type": "module"` in `package.json`

```json
{
  "scripts": {
    "start": "nodemon index.js"
  },
  "type": "module"
}
```

### 7. Open the browser and go to `http://localhost:4000`

## GraphQL Schema

GraphQL Schema is a collection of GraphQL types.
You can design the schema based on your needs.
For now, the schema is defined in `index.js` file.

```js
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
```

But you can define the schema in a separate file and import it in `index.js` file.

### Some basic grammar rules of GraphQL Schema

- Methods:
  - `type`: Defines a new type
  - `Query`: Defines a query type, get data from the server, similar to GET
  - `Mutation`: Defines a mutation type to change data on the server, similar to POST, PUT, and DELETE
- Types:
  - `String`: Defines a type of the field
  - `[]`: Defines an array of the type
  - `ID`: Defines a unique identifier
  - `Int`: Defines an integer
  - `Float`: Defines a float
  - `Boolean`: Defines a boolean
- Extra:
  - `!`: Defines a required field, with `!`, the field is required and cannot be null.
    By default, the field is optional and can be null.

### Example of GraphQL Schema

```js
const typeDefs = gql`
  type Query {
    hello: String
    user: User
    users: [User]! # Array is required, but each item in the array is optional
    userById(id: ID!): User
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      age: Int
      isMale: Boolean
      height: Float
    ): User
    deleteUser(id: ID!): Boolean!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    isMale: Boolean
    height: Float
  }
`;
```