## Section 02: Adding NodeJS to our Project

#### Table of Contents
- Module Introduction
- Connecting Node & Angular - Theory
- What is a RESTful API?
- Adding the Node Backend
- Adding the Express Framework
- Improving the server.js Code
- Fetching Initial Posts
- Using the Angular HTTP Client
- Understanding CORS
- Adding the POST Backend Point
- Adding Angular
- Section Resources


### Connecting Node & Angular - Theory

#### Node App Serves Angular SPA
- Node (Express) handles incoming requests
- Requests targeting "/" path return Angular SPA

#### Two Separated Servers
- Node (Express) handles incoming requests
- Angular SPA served from separate static host

#### In both cases: Logically Separated Apps



### What is a RESTFUL API?

#### REST?
Representational State Transfer

#### What's a RESTful API?
The application programming interface that uses the representational state transfer.

#### Server
- stores and fetches data but doesn't use/render HTML --> Client (Mobile App)
- wants to access third-party features (e.g. Google Geolocation API) --> Client (Code)
- stores and fetches data but never renders a second HTML page --> Client (Browser w/ SPA)

#### RESTful APIs are Stateless Backends
Client sends and receives JSON format data to and from the backend, respectively.
It can also send data in different formats, such as XML, URLEncoded, or FormData.


### Fetching Initial Posts
#### Client Side
```js
ngOnInit() {
  this.postsService.getPosts();
  this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
      this.posts = posts;
  });
}
```

```js
getPosts() {
  this.http
      .get<{ message: string; posts: Post[] }>(
      "http://localhost:3000/api/posts"
      )
      .subscribe(postData => {
      this.posts = postData.posts;
      this.postsUpdated.next([...this.posts]);
    });
}
```

#### Server Side
```js
app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "fadf12421l",
      title: "First server-side post",
      content: "This is coming from the server"
    },
    {
      id: "ksajflaj132",
      title: "Second server-side post",
      content: "This is coming from the server!"
    }
  ];
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts
  });
});
```


### Understanding CORS

#### CORS?
Cross-Origin Resource Sharing

```
    Client   <------------------------->    Server
localhost:3000                         localhost:3000


    Client   <------------------------->    Server
localhost:4000        CORS Error       localhost:3000
```

#### Server Side
```js
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
```


### Adding the POST Backend Point

#### Client Side

```js
addPost(title: string, content: string) {
  const post: Post = { id: null, title: title, content: content };
  this.http
    .post<{ message: string }>("http://localhost:3000/api/posts", post)
    .subscribe(responseData => {
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
  });
}
```

#### Server Side

```js
app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  res.status(201).json({
    message: 'Post added successfully'
  });
});
```


### Section Resources

[Learn Node + Express from Scratch (for free!)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)


[Creating a REST API with Node + Express (+ MongoDB)](https://academind.com/learn/node-js/building-a-restful-api-with/)