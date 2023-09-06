## Section 08: Adding User Authentication

#### Table of Contents
- Module Introduction
- Adding the Login Input Fields
- Handling User Input
- Adding the Signup Screen
- Creating the User Model
- Creating a New User Upon Request
- Connecting Angular to the Backend
- Understanding SPA Authentication
- Implementing SPA Authentication
- Sending the Token to the Frontend
- Adding Middleware to Protect Routes
- Adding the Token to Authenticate Requests
- Improving the UI Header to Reflect the Authentication Status
- Improving the UI Messages to Reflect the Authentication Status
- Connecting the Logout Button to the Authentication Status
- Redirecting Users
- Adding Route Guards
- Reflecting the Token Expiration in the UI
- Saving the Token in the Local Storage
- Section Resources


### Module Introduction



### Adding the Login Input Fields

`code/src/app/auth/login/login.component.css`

`code/src/app/auth/login/login.component.html`

`code/src/app/auth/login/login.component.ts`



### Handling User Input



### Adding the Signup Screen

`code/src/app/auth/signup/signup.component.css`

`code/src/app/auth/signup/signup.component.html`

`code/src/app/auth/signup/signup.component.ts`

`code/src/app/header/header.component.html`
```html
<li *ngIf="!userIsAuthenticated">
  <a mat-button routerLink="/login" routerLinkActive="mat-accent">Login</a>
</li>
<li *ngIf="!userIsAuthenticated">
  <a mat-button routerLink="/signup" routerLinkActive="mat-accent">Signup</a>
</li>
```



### Creating the User Model

`code/backend/app.js`
```js
app.use("/api/user", userRoutes);
```

Install mongoose-unique-validator
```bash
npm install mongoose-unique-validator
```


`code/backend/models/user.js`
```js
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
```



### Creating a New User Upon Request

`code/backend/routes/user.js`
```js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});
```

### Connecting Angular to the Backend

`code/src/app/auth/auth.service.ts`
```js
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  ...

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post("http://localhost:3000/api/user/signup", authData)
      .subscribe(response => {
        console.log(response);
      });
  }
};
```



### Understanding SPA Authentication

#### SPA Authentication

![SPA Authentication](https://github.com/lcycstudio/nodejs/blob/master/Angular%20%26%20NodeJS%20-%20The%20MEAN%20Stack%20Guide/08_adding_user_authentication/spa.png)



### Implementing SPA Authentication

Install `bcrypt` package
```bash
npm install bcrypt --save
```

`code/backend/routes/user.js`
```js
router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});
```



### Sending the Token to the Frontend

`code/src/app/auth/auth.service.ts`
```js
login(email: string, password: string) {
  const authData: AuthData = { email: email, password: password };
  this.http
    .post<{ token: string; expiresIn: number }>(
      "http://localhost:3000/api/user/login",
       authData
    )
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      if (token) {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        console.log(expirationDate);
        this.saveAuthData(token, expirationDate);
        this.router.navigate(["/"]);
      }
    });
}
```

`code/src/app/auth/login/login.component.ts`
```js
export class LoginComponent {
  isLoading = false;

  constructor(public authService: AuthService) {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }
}
```

### Adding Middleware to Protect Routes

#### Server Side
`code/backend/middleware/check-auth.js`
```js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret_this_should_be_longer");
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};
```

#### Client Side
`code/backend/routes/posts.js`
```js
router.post(
  "",
  checkAuth,
  ...
)

...

router.put(
  "/:id",
  checkAuth,
  ...
)

...
```



### Adding the Token to Authenticate Requests

#### Client Side
`code/src/app/auth/auth-interceptor.ts`
```js
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken)
    });
    return next.handle(authRequest);
  }
}
```

`code/src/app/app.module.ts`
```js
  ...
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
```

#### Server Side

`code/backend/app.js`
```js
app.use((req, res, next) => {
  ...
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization" // added Authorization
  );
  ...
});
```



### Improving the UI Header to Reflect the Authentication Status

#### Client Side

`code/src/app/header/header.component.html`
```html
<ul>
    <li *ngIf="userIsAuthenticated">
      <a mat-button routerLink="/create" routerLinkActive="mat-accent">New Post</a>
    </li>
    <li *ngIf="!userIsAuthenticated">
      <a mat-button routerLink="/login" routerLinkActive="mat-accent">Login</a>
    </li>
    <li *ngIf="!userIsAuthenticated">
      <a mat-button routerLink="/signup" routerLinkActive="mat-accent">Signup</a>
    </li>
    <li *ngIf="userIsAuthenticated">
      <button mat-button (click)="onLogout()">Logout</button>
    </li>
  </ul>
```

`code/src/app/auth/auth.service.ts`
```js
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  ...
}
```

`code/src/app/header/header.component.ts`
```js
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
```



### Improving the UI Messages to Reflect the Authentication Status


`code/src/app/posts/post-list/post-list.component.ts`
```js
export class PostListComponent implements OnInit, OnDestroy {
  ...
  userIsAuthenticated = false;
  private authStatusSub: Subscription;

  constructor(
    public postsService: PostsService,
    private authService: AuthService
  ) {}
  ...
  ngOnInit() {
    ...
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  ...
  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
```

`code/src/app/posts/post-list/post-list.component.html`
```html
    <mat-action-row *ngIf="userIsAuthenticated">
      <a mat-button color="primary" [routerLink]="['/edit', post.id]">EDIT</a>
      <button mat-button color="warn" (click)="onDelete(post.id)">DELETE</button>
    </mat-action-row>
```


### Connecting the Logout Button to the Authentication Status

`code/src/app/auth/auth.service.ts`
```js
export class AuthService {
  ...
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }
}
```



### Redirecting Users



### Adding Route Guards

`code/src/app/auth/auth.guard.ts`
```js
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getIsAuth();
    if (!isAuth) {
      this.router.navigate(['/login']);
    }
    return isAuth;
  }
}
```

`code/src/app/app-routing.module.ts`
```js
const routes: Routes = [
  { path: "", component: PostListComponent },
  { path: "create", component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: "edit/:postId", component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
```


### Reflecting the Token Expiration in the UI

`code/src/app/auth/auth.service.ts`
```js
export class AuthService {
  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  ...
  login(email: string, password: string) {
    ...
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate);
          this.router.navigate(["/"]);
    ...
  }
  ...
}
```



### Saving the Token in the Local Storage

`code/src/app/auth/auth.service.ts`
```js
export class AuthService {
  ...
  
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  ...

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  ...

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  ...

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
}
```

`code/src/app/app.component.ts`
```js
import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
```


### Section Resources

[More on JWT](https://jwt.io/introduction/)

[Angular Route Guards](https://angular.io/guide/router#milestone-5-route-guards)

[More on Angular Interceptors](https://angular.io/guide/http#intercepting-requests-and-responses)
