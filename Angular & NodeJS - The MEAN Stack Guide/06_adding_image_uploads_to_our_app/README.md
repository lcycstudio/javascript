## Section 06: Adding Image Uploads to our App

#### Table of Contents
- Module Introduction
- Adding the File Input Button
- Converting the Form from a Template Driven to a Reactive Approach
- Adding Image Controls to Store the Image
- Adding an Image Preview
- Starting with the Mime-Type Validator
- Finishing the Image Validator
- Adding Server Side Upload
- Uploading Files
- Working with the File URL
- Beware of the Spread (...) Operator
- Fetching Images on the Frontend
- Updating Posts with Images
- Wrap Up
- Section Resources



### Module Introduction



### Adding the File Input Button

`code/src/app/posts/post-create/post-create.component.html`
```html
<div>
  <button mat-stroked-button type="button" (click)="filePicker.click()">Pick Image</button>
  <input type="file" #filePicker (change)="onImagePicked($event)">
</div>
```

### Converting the Form from a Template Driven to a Reactive Approach

``
```js
ngOnInit() {
  this.form = new FormGroup({
    title: new FormControl(null, {
      validators: [Validators.required, Validators.minLength(3)]
    }),
    content: new FormControl(null, { validators: [Validators.required] }),
    image: new FormControl(null, {
      validators: [Validators.required],
      asyncValidators: [mimeType]
    })
  });
...
}
```

HTML file: `code/src/app/posts/post-create/post-create.component.html` 



### Adding Image Controls to Store the Image

`code/src/app/posts/post-create/post-create.component.ts`
```js
onImagePicked(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.form.patchValue({ image: file });
  this.form.get("image").updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result as string;
  };
  reader.readAsDataURL(file);
}
```



### Adding an Image Preview



### Starting with the Mime-Type Validator



### Finishing the Image Validator

Refer to `code/src/app/posts/post-create/mime-type.validator.ts`


### Adding Server Side Upload

```
npm install --save multer
```

`code/backend/routes/posts.js`
```js
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});
```

### Uploading Files

#### Client Side

`code/src/app/posts/posts.service.ts`
```js
addPost(title: string, content: string, image: File) {
  const postData = new FormData();
  postData.append("title", title);
  postData.append("content", content);
  postData.append("image", image, title);
  this.http
    .post<{ message: string; post: Post }>(
      "http://localhost:3000/api/posts",
      postData
    )
...
}
```

`code/src/app/posts/post-create/post-create.component.ts`
```js
onSavePost() {
  if (this.form.invalid) {
    return;
  }
  this.isLoading = true;
  if (this.mode === "create") {
    this.postsService.addPost(
      this.form.value.title,
      this.form.value.content,
      this.form.value.image
    );
  } else {
    this.postsService.updatePost(
      this.postId,
      this.form.value.title,
      this.form.value.content,
      this.form.value.image
    );
  }
  this.form.reset();
}
```


### Working with the File URL

`code/backend/routes/posts.js`
```js
router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename
    });
    post.save().then(createdPost => {
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...createdPost,
          id: createdPost._id
        }
      });
    });
  }
);
```

### Beware of the Spread (...) Operator



### Fetching Images on the Frontend

`code/src/app/posts/post-list/post-list.component.html`
```html
<div class="post-image">
  <img [src]="post.imagePath" [alt]="post.title">
</div>
```

#### Server Side

`code/backend/app.js`
```js
const path = require("path");
...
app.use("/images", express.static(path.join("backend/images")));
```



### Updating Posts with Images

`code/src/app/posts/posts.service.ts`
```js
updatePost(id: string, title: string, content: string, image: File | string) {
  let postData: Post | FormData;
  if (typeof image === "object") {
    postData = new FormData();
    postData.append("id", id);
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
  } else {
    postData = {
      id: id,
      title: title,
      content: content,
      imagePath: image
    };
  }
  ...
}
```


### Wrap Up



### Section Resources



