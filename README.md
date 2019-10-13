# BoxBook

Launch GraphQL [Playground](http://localhost:3000/api/v1/graphql) (the server must be running "`npm run dev`")

Contents:

-   [Scripts](#scripts)
-   [Tech](#tech)
    -   [Prisma](#prisma)
        -   [Updating the schema](#updates-to-schema)
        -   [Adding Queries and Mutations](#new-queries-and-mutations)
    -   [Next.js](#next.js)
    -   [React](#react)

## Scripts

Dev (starts a dev server at port 3000)

```bash
npm run dev
```

Build (creates a bundle)

```bash
npm run bulid
```

Start (starts a server at port 3000)

```bash
npm run start
```

Deploy (deploys to Zeit's [now](https://zeit.co/))

```bash
npm run deploy:dev
npm run deploy:prod
```

Test (uses Jest and Enzyme)

```bash
npm run test
npm run test:watch
npm run test:coverage
```

## Tech

1. [GraphQL](https://graphql.org/learn/)
2. [Apollo](https://www.apollographql.com/docs/react/) (on client)
3. [Prisma](https://www.prisma.io/docs) (on server)
4. [Docker](https://docs.docker.com/engine/reference/commandline/cli/) (for local dev)
5. [Next.js](https://nextjs.org/docs)
6. [Now](https://zeit.co/) (hosts the application)
7. [Jest](https://jestjs.io/docs/en/getting-started.html)
8. [Enzyme](https://airbnb.io/enzyme/)
9. [MongoDB Atlas](https://cloud.mongodb.com) (hosts the DB)

### Prisma

Prisma is used for creating the Data Model, and the simple client API that is generated based on the schema.

#### Updates to schema

1. Add/remove updates to ./graphql/types/typeDefs.ts and ./graphql/prisma/datamodel.graphql
2. (OPTIONAL) Run "`prisma deploy`" to deploy updated schema (not necessary unless hosting in prisma cloud)
3. Run "`prisma generate`" to update the TypeScript client
4. Verify the new type in the [playground](http://localhost:3000/api/v1/graphql)

#### New Queries and Mutations

-   Add New Query

    1. Add query signature under Query type to ./graphql/types/typeDefs.ts
    2. Add the query resolver to ./resolvers/queries.ts (NOTE: the resolver name must match the name added to the type definition in step 1, and don't forget the fragment if performing deep queries)
    3. Test query in [playground](http://localhost:3000/api/v1/graphql)
    4. Add query in client
       <br />
       Example:

    ```tsx
    import gql from 'graphql-tag';
    import { NameFragment } from './graphql/types/fragments';
    const GET_USERS = gql`
        query UsersQuery {
            users {
                name ${NameFragment}
                id
            }
        }
    `;
    export default Component(props: any) {
        const { loading, error, data } = useQuery(GET_USERS);
        return (
            ...
        )
    }
    ```

-   Add New Mutation

    1. Add mutation signature under Mutation type to .graphql//types/typeDefs.ts
    2. Add the mutation resolver to ./resolvers/mutations.ts (NOTE: the resolver name must match the name added to the type definition in step 1, and don't forget the fragment if performing deep queries)
    3. Test mutation in [playground](http://localhost:3000/api/v1/graphql)
    4. Add mutation in client
       <br />
       Example:

    ```tsx
    import gql from 'graphql-tag';
    import { NameFragment } from './graphql/types/fragments';
    const CREATE_USER = gql`
        mutation CreateUser($name: String!) {
            createUser(name: $name) {
                id
                name ${NameFragment}
            }
        }
    `;
    export default Component(props: any) {
        const [createUser, { data }] = useMutation(CREATE_USER);
        return (
            <form
                onSubmit={e => {
                    e.preventDefault();
                    createUser({ variables: { name } });
                }}
            >
                ...
            </form>
        )
    }
    ```

### Next.js

### React
