## Section 12: Building From Scratch

#### Table of Contents

- App Overview
- App Challenges
- Boilerplate Setup
- Authentication Approach
- MLab Setup
- The User Type
- The Signup Mutation
- Delegating to the Auth Service
- Testing Signup
- The Logout Mutation
- The Login Mutation
- Checking Authentication Status

### App Overview

- Landing page
- Sign up page
- Sign in page

### App Challenges

- Handling Errors Around Signup
- Race Conditions - A Big Gotcha
- Finalized Auth Flow
- Fixing the Login Process
- Fix Signup Too!
- The Dashboard Route
- The Need for a HOC
- Getting Started with RequireAuth
- Applying RequireAuth
- Fixing RequireAuth

![Fullstack Architecture](/GraphQL_with_React_The_Complete_Developers_Guide/12_building_from_scratch/fullstack.png)

### Boilerplate Setup

### Authentication Approach

![PassportJS](/GraphQL_with_React_The_Complete_Developers_Guide/12_building_from_scratch/passportjs.png)

![Decoupled Approach](/GraphQL_with_React_The_Complete_Developers_Guide/12_building_from_scratch/decouple.png)

![Coupled Approach](/GraphQL_with_React_The_Complete_Developers_Guide/12_building_from_scratch/couple.png)

![Decoupled Frontend](/GraphQL_with_React_The_Complete_Developers_Guide/12_building_from_scratch/decouple_frontend.png)

#### Decision

We will use Coupled Approach even though GraphQL doesn't work well with
Passport.js

### MLab Setup

### The User Type

![GraphQL Relay](/GraphQL_with_React_The_Complete_Developers_Guide/12_building_from_scratch/graphql_relay.png)

### The Signup Mutation

#### Mutations

- Signup -----> Helper Function/Object
- Login -----> Helper Function/Object
- Logout -----> Helper Function/Object

### Delegating to the Auth Service

### Testing Signup

### The Logout Mutation

### The Login Mutation

### Checking Authentication Status
