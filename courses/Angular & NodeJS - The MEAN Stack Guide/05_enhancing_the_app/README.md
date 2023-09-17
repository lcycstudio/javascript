## Section 05: Enhancing the App

#### Table of Contents
- Module Introduction
- Adding Routing
- Styling Links
- Client Side vs Server Side Routing
- Possible Error
- Creating the "edit" Form
- Finishing the Edit Feature
- Updating Posts on the Server
- Re-Organizing Backend Routes
- Adding Loading Spinners
- Section Resources


### Module Introduction


### Adding Routing

`code/src/app/app-routing.module.ts`
```js
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent },
  { path: 'edit/:postId', component: PostCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```


`code/src/app/app.module.ts`
```js
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  ...,
  imports: [
    ...
    AppRoutingModule,
    ...
  ],
  ...
})
```

`code/src/app/app.component.html`
```html
<app-header></app-header>
<main>
  <router-outlet></router-outlet>
</main>
```

`code/src/header/header.component.html`
```html
<mat-toolbar color="primary">
  <span>
    <a routerLink="/">MyMessages</a>
  </span>
  <span class="spacer"></span>
  <ul>
    <li>
      <a mat-button routerLink="/create" routerLinkActive="mat-accent">New Post</a>
    </li>
  </ul>
</mat-toolbar>
```


### Styling Links


### Client Side vs Server Side Routing


### Possible Error


### Creating the "edit" Form

#### Client Side
`code/src/posts/post-create/post-create.component.ts`
```js
if (paramMap.has("postId")) {
  this.mode = "edit";
  this.postId = paramMap.get("postId");
  this.isLoading = true;
  this.postsService.getPost(this.postId).subscribe(postData => {
    this.isLoading = false;
    this.post = {id: postData._id, title: postData.title, content: postData.content};
  });
}
...
onSavePost(form: NgForm) {
  else {
    this.postsService.updatePost(
    this.postId,
    form.value.title,
    form.value.content
    );
  }
}
```

`code/src/app/posts/posts.service.ts`
```js
getPost(id: string) {
  return this.http.get<{ _id: string; title: string; content: string }>(
    "http://localhost:3000/api/posts/" + id
  );
}
```

### Finishing the Edit Feature

#### Client Side
`code/src/posts/post-create/post-create.component.ts`
```js
updatePost(id: string, title: string, content: string) {
  const post: Post = { id: id, title: title, content: content };
  this.http
    .put("http://localhost:3000/api/posts/" + id, post)
    .subscribe(response => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    });
}
...
onSavePost(form: NgForm) {
  if (form.invalid) {
    return;
  }
  this.isLoading = true;
  if (this.mode === "create") {
    this.postsService.addPost(form.value.title, form.value.content);
  } else {
    this.postsService.updatePost(
      this.postId,
      form.value.title,
      form.value.content
    );
  }
  form.resetForm();
}
```


#### Server Side

`code/backend/routes/posts.js`
```js
router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});
```

### Updating Posts on the Server

#### Client Side
`code/src/app/posts/posts.service.ts`
```js
updatePost(id: string, title: string, content: string) {
  const post: Post = { id: id, title: title, content: content };
  this.http
    .put("http://localhost:3000/api/posts/" + id, post)
    .subscribe(response => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    });
}
```

#### Server Side

`code/backend/app.js`
```js
app.use("/api/posts", postsRoutes);
```

`code/backend/routes/posts.js`
```js
router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});
```

### Re-Organizing Backend Routes

`code/backend/routes/posts.js`
```js
const express = require("express");

const Post = require("../models/post");

const router = express.Router();

...

module.exports = router;
```


### Adding Loading Spinners

### Section Resources

