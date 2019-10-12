import React, { useState } from 'react';
import Head from 'next/head';
import Nav from '../components/ui/nav';
import { withApollo } from '../graphql/apollo/client';
import { useQuery, useMutation } from '@apollo/react-hooks';

import gql from 'graphql-tag';
const GET_USERS = gql`
    query UsersQuery {
        users {
            name
            id
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
    const [name, setName] = useState('');

    const query = useQuery(GET_USERS);

    const [createUser, result] = useMutation(CREATE_USER);

    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>

            <Nav />

            <form
                onSubmit={e => {
                    e.preventDefault();
                    createUser({ variables: { name } });
                }}
            >
                <input
                    type='text'
                    value={name}
                    onChange={e => {
                        setName(e.target.value);
                    }}
                />
                <button>Create User</button>
            </form>
        </div>
    );
};

// Home.getInitialProps = async ({ req }) => {
// };

export default withApollo(Home);
