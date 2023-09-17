## Section 04: Working with MongoDB

#### Table of Contents
- Module Introduction
- What is MongoDB?
- Comparing SQL & NoSQL
- Connecting Angular to a Database
- Setting Up MongoDB
- Using MongoDB Atlas & IP Whitelist
- Adding Mongoose
- Understanding Mongoose Schemas & Models
- Creating a POST Instance
- Connecting our Node Express App to MongoDB
- Storing Data in a Database
- Fetching Data From a Database
- Transforming Response Data
- Deleting Documents
- Updating the Frontend after Deleting Posts
- Adding Posts with an ID
- Section Resources



### Module Introduction



### What is MongoDB?

#### MongoDB
A NoSQL Database which stores "Documents" in "Collections" (instead of "Records"
in "Tables" as in SQL). It is a powerful database which can easily be integrated
into a Node/Express environment.

- Store application data (Users, Products, ...)
- Enforces no data schema or relations
- Easily connected to Node/Express


### Comparing SQL & NoSQL

#### NoSQL vs SQL

| **NoSQL**                                | **SQL**                                      |
|------------------------------------------|----------------------------------------------|
| MongoDB, CouchDB                         | MySQL, MS SQL                                |
| Enforces no Data Schema                  | Enforces a Strict Data Schema                |
| Less Focused on Relations                | Relations are a Core Feature                 |
| Less Focused on Relations                | Relations are a Core Feature                 |
| "Independent Documents"                  | Records are Related                          |
| Great for: Logs, Orders, (Chat) Messages | Great for: Shopping Cart, Contacts, Networks |



### Connecting Angular to a Database

#### Connect Angular to the Database?
- It's highly insecure! Secure authentication is not really possible.
- NodeJS code can't be read by our users because it resides on a server.



### Setting Up MongoDB


### Using MongoDB Atlas & IP Whitelist

Add our local IP to the "IP Whitelist".



### Adding Mongoose

[Mongoose](https://mongoosejs.com/)

```
npm install --save mongoose
```



### Understanding Mongoose Schemas & Models

`code/backend/models/post.js`

```js
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

module.exports = mongoose.model('Post', postSchema);
```



### Creating a POST Instance

`code/backend/app.js`

```js
const Post = require("./models/post");

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});
```

### Connecting our Node Express App to MongoDB

`code/backend/app.js`

```js
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://max:QuBqs0T45GDKPlIG@cluster0-ntrwp.mongodb.net/node-angular?retryWrites=true"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });
```



### Storing Data in a Database

`code/backend/app.js`

```js
const Post = require("./models/post");

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});
```



### Fetching Data From a Database

`code/backend/app.js`

```js
app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});
```



### Transforming Response Data

#### Operators

To convert `_id` in response data to `id` in frontend `Post` schema, we can use
_operators_. Since the HTTP client of Angular uses observables, we get access to
many great operators which are offered by observables. Operators are basically
functions. We can apply to the observable streams or to be precise to the data
we get through these streams before the data is ultimately handled in the 
subscription. We place `pipe` before `subscribe`. 

`code/src/posts/posts/service.ts`

```js
getPosts() {
  this.http
    .get<{ message: string; posts: any }>(
      "http://localhost:3000/api/posts"
    )
    // the code below (pipe) is to convert '_id' to 'id'
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
    }))
    .subscribe(transformedPosts => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }
```



### Deleting Documents


#### Server Side

`code/backend/app.js`

```js
app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: "Post deleted!" });
  });
});
```

#### Client Side

`code/src/posts/post-list/posts.service.js`

```js
deletePost(postId: string) {
  this.http.delete("http://localhost:3000/api/posts/" + postId)
    .subscribe(() => {
      console.log('Deleted!');
    });
}
```


### Updating the Frontend after Deleting Posts

`code/src/posts/post-list/posts.service.js`

```js
deletePost(postId: string) {
  this.http.delete("http://localhost:3000/api/posts/" + postId)
    .subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
}
```



### Adding Posts with an ID

#### Client Side

`code/src/posts/post-list/posts.service.js`

```js
addPost(title: string, content: string) {
  const post: Post = { id: null, title: title, content: content };
  this.http
    .post<{ message: string, postId: string }>("http://localhost:3000/api/posts", post)
    .subscribe(responseData => {
      const id = responseData.postId;
      post.id = id; // update the id of the post object
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
}
```

#### Server Side

```js
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id // return the id of the post after the post method
    });
  });
});
```

### Section Resources

[Mongoose Docs](http://mongoosejs.com/docs/guide.html)

[MongoDB Docs](https://www.mongodb.com/)

[MongoDB Atlas Docs](https://www.mongodb.com/cloud/atlas)


