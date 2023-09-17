## Section 04: Fetching Data with Queries

#### Table of Contents
- Nested Queries
- More on Nested Queries
- A Quick Breather
- Multiple RootQuery Entry Points
- Bidirectional Relations
- More on Bidirectional Relations
- Resolving Circular References
- Query Fragments
- Introduction to Mutations
- NonNull Fields and Mutations
- Do It Yourself - Delete Mutation!
- Do It Yourself - Edit Mutation!


### Nested Queries
```js
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then(res => res.data);
      }
    }
  }
});
```
The field name `company` is not `companyId` because `companyId` is the field on the User
model or the database. The `UserType` will require the field `company` and its data in 
the JSON format, in which the ID of the company will be fetched via `axios.get()`.


### A Quick Breather

The resolve function connects to an instance of another query type and returns the
reference to another piece of the data.

![Resolve Function](https://github.com/lcycstudio/nodejs/blob/master/GraphQL_with_React_The_Complete_Developers_Guide/04_fetching_data_with_queries/resolve.png)



### Resolving Circular References

To resolve circular references, such as `CompanyType` using `UserType` in its `users` field
and `UserType` using `CompanyType` in its `company` field, we can use javascript arrow
function `() => ()` to compile the entire file of code prior to calling each individual
variables. We replace `fields: {}` with `fields: () => ({})` for `CompanyType` below.

```js
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({ // use () => () here
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then(res => res.data)
      }
    }
  })
});
```

#### Nested queries
```js
query findCompany {
  company(id: "2") {
    id
    name
    description
    users {
      id
      firstName
      age
      company {
        name
        description
        users {
          company {
            name
          }
        }
      }
    }
  }
}
```

### Query Fragments
```js
{
  apple: company(id: "1"){
    ...companyDetails
  }
  google: company(id: "2"){
    ...companyDetails
  }
}

fragment companyDetails on Company {
  id
  name
  description
}
```


### Introduction to Mutations
Mutations can be used to delete records, update them or even create new records.

![Mutations](https://github.com/lcycstudio/nodejs/blob/master/GraphQL_with_React_The_Complete_Developers_Guide/04_fetching_data_with_queries/mutations.png)



### NonNull Fields and Mutations

#### GraphiQL Docs
A GraphQL schema provides a root type for each kind of operation.

```
query: RootQueryType
mutation: Mutation
```


#### Mutation
```addUser(
firstName: String!
age: Int!
companyId: String
): User
```

#### Add User
`schema.js`
```js
addUser: {
  type: UserType,
  args: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: GraphQLInt },
    companyId: { type: GraphQLString },
  },
  resolve(parentValue, { firstName, age, companyId }) {
    return axios
      .post('http://localhost:3000/users', { firstName, age, companyId })
      .then((res) => res.data);
  },
},
```

#### GraphiQL
```js
mutation {
  addUser(firstName: "Stephen", age: 26) {
    id
    firstName
    age
  }
}
```

### Do It Yourself - Delete Mutation!
`schema.js`
```js
deleteUser: {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(parentValue, { id }) {
    return axios
      .delete(`http://localhost:3000/users/${id}`)
      .then((res) => res.data);
  },
},
```

#### GraphiQL
```js
mutation {
  deleteUser(id: "23") {
    id
  }
}
```

### Do It Yourself - Edit Mutation!
`schema.js`
```js
editUser: {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    companyId: { type: GraphQLString },
  },
  resolve(parentValue, args) {
    return axios
      .patch(`http://localhost:3000/users/${args.id}`, args)
      .then((res) => res.data);
  },
},
```
#### GraphiQL
```js
mutation {
  editUser(id: "40", firstName: "Samantha", age: 10) {
    id
    firstName
    age
  }
}
```



