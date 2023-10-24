## Section 08: Frontend Mutations

#### Table of Contents

- Mutations in React
- Query Params
- Defining Query Variables in React
- Navigating on Successful Mutation
- Troubleshooting List Fetching
- Refetching Queries
- Deletion by Mutation
- Associating Mutations with a Component
- Invoking Delete Mutations

### Mutations in React

`addSong`

```js
mutation {
  addSong(title:"Dog Call") {
    id
    title
  }
}
```

### Query Params

![Mutation Add Song](/GraphQL_with_React_The_Complete_Developers_Guide/08_frontend_mutations/mutation_add_song.png)

```js
mutation AddSong($title: String) {
  addSong(title: $title) {
    id
    title
  }
}
```

### Defining Query Variables in React

### Navigating on Successful Mutation

### Troubleshooting List Fetching

### Refetching Queries

### Deletion by Mutation

`DeleteSong`

```js
mutation DeleteSong($id: ID) {
  deleteSong(id: $id) {
    id
    title
  }
}
```

### Associating Mutations with a Component

### Invoking Delete Mutations
