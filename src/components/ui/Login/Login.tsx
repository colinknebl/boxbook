import { useContext, useState } from 'react';
import Router from 'next/router';

import styled from 'styled-components';

import { ReactContext } from '../../../../pages/_app';
import Input from '../Input';
import Button from '../Button';
import Link from 'next/link';

interface IProps {}

export const StyledLogin = styled.section`
    background: white;
    padding: 1rem;
    color: var(--secondary-color);
    box-shadow: var(--shadow-dreamy);
    text-align: center;
    margin: 2rem auto;
    padding: 20px;
    max-width: 400px;
    width: 100%;
    display: grid;
    grid-gap: 10px;

    button,
    .create-account-link {
        margin: 5px 0 0 0;
    }

    .page-title {
        margin: 0px 0 32px 0;
        font-size: 2rem;
        text-decoration: underline;
    }
`;

function Login(props: IProps) {
    const ctx = useContext(ReactContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onClick = async () => {
        if (email.length && password.length) {
            const loggedInSuccessful = await ctx.login(email, password);
            if (loggedInSuccessful) {
                Router.push('/app/events');
            }
        }
    };
    return (
        <StyledLogin>
            <p className='page-title'>Login</p>
            <Input
                type='text'
                placeholder='Email'
                isErrored={false}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(event.target.value);
                }}
                value={email}
                required
            />
            <Input
                type='password'
                placeholder='Password'
                isErrored={false}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(event.target.value);
                }}
                value={password}
                required
            />

            <Button type='secondary' text='Login' onClick={onClick} />
            <p className='create-account-link'>
                Don't have an account?{' '}
                <Link href='/app/create-account' shallow={true}>
                    Create Account
                </Link>
            </p>
        </StyledLogin>
    );
}

export default Login;
