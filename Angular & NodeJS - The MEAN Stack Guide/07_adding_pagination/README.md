## Section 07: Adding Pagination

#### Table of Contents
- Module Introduction
- Adding the Pagination Component
- Working on the Pagination Backend
- Connecting the Angular Paginator to the Backend
- Fetching Posts Correctly
- Finishing Touches
- Section Resources


### Module Introduction



### Adding the Pagination Component

`code/src/app/posts/post-list/post-list.component.html`
```html
<mat-paginator [length]="totalPosts" [pageSize]="postsPerPage" [pageSizeOptions]   
   ="pageSizeOptions" (page)="onChangedPage($event)" *ngIf="posts.length > 0">
</mat-paginator>
```

`code/src/app/posts/post-list/post-list.component.ts`
```js
postsPerPage = 2;
currentPage = 1;
pageSizeOptions = [1, 2, 5, 10];
...

onChangedPage(pageData: PageEvent) {
  this.isLoading = true;
  this.currentPage = pageData.pageIndex + 1;
  this.postsPerPage = pageData.pageSize;
  this.postsService.getPosts(this.postsPerPage, this.currentPage);
}
```



### Working on the Pagination Backend

`code/backend/routes/posts.js`
```js
router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count
      });
    });
});
```


### Connecting the Angular Paginator to the Backend

`code/src/app/posts/posts.service.ts`
```js
getPosts(postsPerPage: number, currentPage: number) {
  const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
  this.http
    .get<{ message: string; posts: any; maxPosts: number }>(
      "http://localhost:3000/api/posts" + queryParams
    )
  ...
}
```


### Fetching Posts Correctly



### Finishing Touches

`code/src/app/posts/post-list/post-list.component.ts`
```js
ngOnInit() {
  this.isLoading = true;
  this.postsService.getPosts(this.postsPerPage, this.currentPage);
  this.postsSub = this.postsService
    .getPostUpdateListener()
    .subscribe((postData: {posts: Post[], postCount: number}) => {
      this.isLoading = false;
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });
}

...

onDelete(postId: string) {
  this.isLoading = true;
  this.postsService.deletePost(postId).subscribe(() => {
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  });
}
```

### Section Resources


