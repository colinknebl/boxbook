import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { withApollo } from '../src/graphql/apollo/client';

import gql from 'graphql-tag';
import Link from 'next/link';

const GET_USERS = gql`
    query UsersQuery {
        users {
            id
            name
        }
    }
`;

const CREATE_USER = gql`
    mutation CreateUser($name: String!) {
        createUser(name: $name) {
            id
            name
        }
    }
`;

const Home = (props: any) => {
    // const query = useQuery(GET_USERS);
    // console.log('TCL: Home -> query', query);

    // const users = new Users();
    // users.get().then(users => {
    //     console.log('TCL: Home -> users in promise', users);
    // });

    const [createUser, result] = useMutation(CREATE_USER);

    return (
        <section>
            <h1>Box Book Home</h1>
            <Link href='/app' prefetch={true}>
                <button>open app</button>
            </Link>
        </section>
    );
};

// Home.getInitialProps = async ({ req }) => {
// const usersCollection = new Users();
// const users = await usersCollection.get();
// console.log('TCL: Home.getInitialProps -> users', users);
// return {};
// };

export default withApollo(Home);
