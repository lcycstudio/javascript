## Section 09: Automatic Data Caching

#### Table of Contents
- Refetching a Query
- A Quick CSS Breather
- Showing a Particular Song
- Fetching Individual Records


### Refetching a Query


### A Quick CSS Breather


### Showing a Particular Song


### Fetching Individual Records

Fetching a single song
```js
query SongQuery($id: ID!){
  song(id: $id) {
    id
    title
  }
}
```
