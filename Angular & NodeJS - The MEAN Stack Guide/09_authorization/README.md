## Section 09: Authorization

#### Table of Contents
- Module Introduction
- Adding a Reference to the Model
- Adding the User ID to Posts
- Changed Mongoose Syntax
- Protecting Resources with Authorization
- Passing the User ID to the Frontend
- Using the User ID on the Frontend
- Section Resources


### Module Introduction



### Adding a Reference to the Model


`code/backend/models/post.js`
```js
const postSchema = mongoose.Schema({
  ...
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});
```


### Adding the User ID to Posts


`code/backend/routes/posts.js`
```js
const checkAuth = require("../middleware/check-auth");
...
router.post(
  "",
  checkAuth, // added checkAuth 
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    ...
    const post = new Post({
      ...
      creator: req.userData.userId
    });
  }
);

router.put(
  "/:id",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    ...
    const post = new Post({
      ...
      creator: req.userData.userId // added creator field
    });
    Post.updateOne(
      { _id: req.params.id, creator: req.userData.userId }, // added creator field
      post
    ).then(result => {
      if (result.nModified > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    });
  }
);
```

`code/backend/middleware/check-auth.js`
```js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};
```


### Changed Mongoose Syntax



### Protecting Resources with Authorization

`code/backend/routes/posts.js`
```js
router.delete("/:id", checkAuth, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
    result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    }
  );
});
```



### Passing the User ID to the Frontend

Add `userId` to most of the methods like `login`, `logout`, `autoAuthUser`, `saveAuthData`, `clearAuthData`, 
`getAuthData`. 

`code/src/app/auth/auth.service.ts`
```js
export class AuthService {
  ...

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number, userId: string }>( // added userId
        "http://localhost:3000/api/user/login",
        authData
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          ...
          this.userId = response.userId; // added userId
          ...
          this.saveAuthData(token, expirationDate, this.userId); // added userId
        }
      });
  }
};
```


### Using the User ID on the Frontend

`code/src/app/posts/post-list/post-list.component.html`
```html
<mat-action-row *ngIf="userIsAuthenticated && userId === post.creator">
  <a mat-button color="primary" [routerLink]="['/edit', post.id]">EDIT</a>
  <button mat-button color="warn" (click)="onDelete(post.id)">DELETE</button>
</mat-action-row>
```

Remember to add `creator` field to everywhere using the **Post Model**.

### Section Resources

[Mongoose Relations](http://mongoosejs.com/docs/populate.html)


