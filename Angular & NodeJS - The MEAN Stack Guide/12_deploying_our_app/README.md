## Section 12: Deploying our App

#### Table of Contents

- Module Introduction
- Deployment Options
- The Procfile File
- Two Apps -- Deploying the REST API
- Two Apps -- The Public Bucket
- Two Apps -- Angular Deployment
- Using the Integrated Approach -- One App
- Section Resources

### Module Introduction

#### Deployment

Shipping our app

### Deployment Options

![Deployment Options](/Angular%20&%20NodeJS%20-%20The%20MEAN%20Stack%20Guide/12_deploying_our_app/deployment.png)

### The Procfile File

Add `Procfile` to `two-separate-apps` folder `two-separate-apps/Procfile`

```
web: node server.js
```

### Two Apps -- Deploying the REST API

- Move `server.js` file to the `backend` folder
- Make the change in `package.json`
  `"start:server": "nodemon ./backend/server.js"`
- Make `package.json` for backend as well and remove all dependencies related to
  Angular `two-separate-apps/backend/package.json`

```js
{
  "name": "mean-course",
  "version": "0.0.0",
  "private": true,
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.18.3",
    "express": "^4.16.3",
    "jsonwebtoken": "^8.2.1",
    "mongoose": "^5.1.2",
    "mongoose-unique-validator": "^2.0.1",
    "multer": "^1.3.0"
  }
}
```

#### AWS Elastic

- Application Name: node-angular
- Description: MEAN App
- Create
- Basic configuration
  - Platform: Node.js
  - Appliation code:
    - Upload your code: `two-separate-apps/backend/Archive.zip`
- Configure more options
  - Configuration presets: Low cost (_Free Tier eligible_)
  - Software: Modify
    - Node.js version: latest (8.11.1)
    - Node command: `node server.js`
    - Environment properties:
      - MONGO_ATLAS_PW: QuBqs0T45GDKPlIG
      - JWT_KEY: secret_this_should_be_longer
    - Save
  - Create Environment

#### Possible Errors

- MongoDB database needs to add IP of the AWS Elastic
- CORS

### Two Apps -- The Public Bucket

#### Public Bucket Checked

![Publick Bucket](/Angular%20&%20NodeJS%20-%20The%20MEAN%20Stack%20Guide/12_deploying_our_app/public_bucket.png)

### Two Apps -- Angular Deployment

Build the Angular Project

```bash
npm run build --prod
```

`two-separate-apps/src/environments/environment.prod.ts`

```js
export const environment = {
  production: true,
  // use your own backend url
  apiUrl: "http://meantest-env.m5qm3nbaay.us-east-1.elasticbeanstalk.com/api",
};
```

#### Create an S3 Bucket

- Upload all the files in the distribution folder
  - `two-separate-apps\angular.json`
    - "outputPath": "dist/mean-course",
- Change Bucket Policy

  - Granting Read-Only Permission to an Anonymous User

    { "Version": "2012-10-17", "Statement": { { "Sid": "AddPerm", "Effect":
    "Allow", "Principal": "_", "Action": ["s3:GetObject"], "Resource":
    ["arn:aws:s3:::examplebucket/_"] } } }

    - `examplebucket` is the bucket you just created
    - Save

- Static website hosting
  - Use this bucket to host a website
  - Index document: `index.html`
  - Error document: `index.html`
  - Save

### Using the Integrated Approach -- One App

`all-in-one-app\angular.json`

```json
{
  ...,
  "outputPath": "backend/angular",
  ...
}
```

`all-in-one-app\backend\app.js`

```js
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

mongoose
  .connect(
    "mongodb+srv://max:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0-ntrwp.mongodb.net/node-angular"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/", express.static(path.join(__dirname, "angular")));

// CORS is not necessary as the server is rendering the static files
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//   );
//   next();
// });

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use((req, res, next) => {
  // set the home page of localhost:3000 to the Angular home page
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});

module.exports = app;
```

```bash
npm run build --prod
```

Compress everything inside `backend` folder into a zip file `Archive.zip`.

#### AWS Elastic

- Application Name: node-angular
- Description: MEAN App
- Create
- Basic configuration
  - Platform: Node.js
  - Appliation code:
    - Upload your code: `all-in-one-app/backend/Archive.zip`
- Configure more options
  - Configuration presets: Low cost (_Free Tier eligible_)
  - Software: Modify
    - Node.js version: latest (8.11.1)
    - Node command: `node server.js`
    - Environment properties:
      - MONGO_ATLAS_PW: QuBqs0T45GDKPlIG
      - JWT_KEY: secret_this_should_be_longer
    - Save
  - Create Environment

### Section Resources

[AWS Elastic Beanstalk Documentation](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html)
