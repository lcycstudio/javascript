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

![Resolve Function]()
