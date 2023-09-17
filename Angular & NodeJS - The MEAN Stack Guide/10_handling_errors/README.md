## Section 10: Handling Errors

#### Table of Contents
- Module Introduction
- Testing Different Places to Handle Errors
- The Error Interceptor
- Displaying the Basic Error Dialog
- Adding an Error Dialog
- Returning Error Messages on the Server
- Finishing Touches
- Section Resources


### Module Introduction

#### Handling Errors Correctly
Because they're not the end of the world (just the end of your request...)



### Testing Different Places to Handle Errors

```js
export class AuthService {
  ...
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}
  
  ...

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post("http://localhost:3000/api/user/signup", authData)
      .subscribe(() => {
        this.router.navigate(["/"]);
      }, error => {
        this.authStatusListener.next(false); // don't proceed further
      });
  }
  ...
}
```



### The Error Interceptor

`code/src/app/error-interceptor.ts`
```js
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";

import { ErrorComponent } from "./error/error.component";
import { ErrorService } from "./error/error.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog, private errorService: ErrorService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "An unknown error occurred!";
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        this.dialog.open(ErrorComponent, {data: {message: errorMessage}});
        // this.errorService.throwError(errorMessage);
        return throwError(error);
      })
    );
  }
}
```

`code/src/app/app.module.ts`
```js
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
```


### Displaying the Basic Error Dialog

`code/src/app/error/error.service.ts`
```js
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ErrorService {
  private errorListener = new Subject<string>();

  getErrorListener() {
    return this.errorListener.asObservable();
  }

  throwError(message: string) {
    this.errorListener.next(message);
  }

  handleError() {
    this.errorListener.next(null);
  }
}
```

`code/src/app/error/error.component.ts`
```js
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  templateUrl: "./error.component.html",
  selector: "app-error",
})
export class ErrorComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
```

Import `ErrorComponent` into `app.module.ts`
`code/src/app/app.module.ts`
```js
import { ErrorComponent } from "./error/error.component";

@NgModule({
  declarations: [
    ...
    ErrorComponent
  ],
  ...
})
```


### Adding an Error Dialog

`code/src/app/error/error.component.html`
```html
<h1 mat-dialog-title>An Error Occurred!</h1>
<div mat-dialog-content>
  <p class="mat-body-1">{{ data?.message }}</p>
</div>
<div mat-dialog-actions>
  <button mat-button mat-dialog-close>Okay</button>
</div>
```


### Returning Error Messages on the Server

Return error messages in the backend methods upon catching errors.

`code/backend/routes/posts.js`
```js

router.post(
  "",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    ...
    post
      ...
      .catch(error => {
        res.status(500).json({
          message: "Creating a post failed!"
        });
      });
  }
);
```



### Finishing Touches



### Section Resources

[Angular Material Dialog Docs](https://material.angular.io/components/dialog/overview)

I honestly think that using `RxJS` library makes it quite confusing and difficult to follow.