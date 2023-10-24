## Section 06: Clientside GraphQL

#### Table of Contents

- The Next App
- Starter Pack Walkthrough
- MongoDB Atlas Setup and Configuration
- MongoLab Setup
- Working Through the Schema
- Apollo Client Setup
- React Component Design
- GQL Queries in React
- Bonding Queries with Components

### The Next App

### Starter Pack Walkthrough

![Song Client Diagram](/GraphQL_with_React_The_Complete_Developers_Guide/06_clientside_graphql/song_client.png)

![Song Client Diagram](/GraphQL_with_React_The_Complete_Developers_Guide/06_clientside_graphql/song_server.png)

### MongoDB Atlas Setup and Configuration

### MongoLab Setup

### Working Through the Schema

#### GraphiQL

```
query: RootQueryType
mutation: Mutation
```

#### RootQueryType

```
songs: [SongType]
song(id: ID!): SongType
lyric(id: ID!): LyricType
```

#### Mutation

```
addSong(title: String): SongType
addLyricToSong(content: StringsongId: ID): SongType
likeLyric(id: ID): LyricType
deleteSong(id: ID): SongType
```

#### Add a song

```js
mutation {
  addSong(title: "Cold Night") {
    id
  }
}
```

#### Add lyric to a song

```js
mutation {
  addLyricToSong(
    songId: "648fc4c9e49159686c15e14a",
    content: "DOn't go gentle into the cold night")
  {
    id
  }
}
```

#### Get songs

```js
{
  songs {
    id
    title
    lyrics {
      content
    }
  }
}
```

![Apollo Store Diagram](/GraphQL_with_React_The_Complete_Developers_Guide/06_clientside_graphql/apollo_store.png)

### Apollo Client Setup

### React Component Design

### GQL Queries in React

#### GraphQL + React Strategy

1. Identify data required
2. Write query in Graphiql (for practice) and in component file
3. Bond query + component
4. Access data!

#### Identify Data Required

We only need the title of the song

#### Write query in Graphiql

```js
{
    songs {
        title
    }
}
```

#### Write query in component file "SongList.js"

Use of `gql` from `graphql-tag`

### Bonding Queries with Components

```js
import { graphql } from 'react-apollo';
...
export default graphql(query)(SongList)
```
