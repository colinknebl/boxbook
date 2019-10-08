import React, { useState } from 'react';
import Head from 'next/head';
import Nav from '../components/nav';
import fetch from 'node-fetch';
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

            <span>Name: {props.users.name}</span>

            <div className='hero'>
                <h1 className='title'>Welcome to Next.js!</h1>
                <p className='description'>
                    To get started, edit <code>pages/index.js</code> and save to
                    reload.
                </p>

                <div className='row'>
                    <a href='https://nextjs.org/docs' className='card'>
                        <h3>Documentation &rarr;</h3>
                        <p>Learn more about Next.js in the documentation.</p>
                    </a>
                    <a href='https://nextjs.org/learn' className='card'>
                        <h3>Next.js Learn &rarr;</h3>
                        <p>
                            Learn about Next.js by following an interactive
                            tutorial!
                        </p>
                    </a>
                    <a
                        href='https://github.com/zeit/next.js/tree/master/examples'
                        className='card'
                    >
                        <h3>Examples &rarr;</h3>
                        <p>
                            Find other example boilerplates on the Next.js
                            GitHub.
                        </p>
                    </a>
                </div>
            </div>

            <style jsx>{`
                .hero {
                    width: 100%;
                    color: #333;
                }
                .title {
                    margin: 0;
                    width: 100%;
                    padding-top: 80px;
                    line-height: 1.15;
                    font-size: 48px;
                }
                .title,
                .description {
                    text-align: center;
                }
                .row {
                    max-width: 880px;
                    margin: 80px auto 40px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                }
                .card {
                    padding: 18px 18px 24px;
                    width: 220px;
                    text-align: left;
                    text-decoration: none;
                    color: #434343;
                    border: 1px solid #9b9b9b;
                }
                .card:hover {
                    border-color: #067df7;
                }
                .card h3 {
                    margin: 0;
                    color: #067df7;
                    font-size: 18px;
                }
                .card p {
                    margin: 0;
                    padding: 12px 0 0;
                    font-size: 13px;
                    color: #333;
                }
            `}</style>
        </div>
    );
};

Home.getInitialProps = async ({ req }) => {
    // console.log('getInitialProps on server');
    // const res = await fetch('http://localhost:3000/api/v1/users');
    const res = await fetch('https://boxbook.colinknebl.now.sh/api/v1/users');
    const json = await res.json();
    // console.log('fetched users, returning:', { users: json });
    return { users: json };
};

export default withApollo(Home);
