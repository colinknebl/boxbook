import { useContext, useState, useEffect } from 'react';
import Router from 'next/router';

import styled from 'styled-components';

import MainAppContext from '../context/MainAppContext';
import Input from '../Input';
import Button from '../Button';
import Link from 'next/link';
import { reduceStrings } from '../../utils/reduceStrings';

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
    .signup-link {
        margin: 5px 0 0 0;

        a {
            color: var(--primary-color);
            transition: all var(--transition-duration) ease-in-out;
            &:hover {
                color: var(--primary-color--hover);
            }
        }
    }

    .page-title {
        margin: 0px 0 32px 0;
        font-size: 2rem;
        text-decoration: underline;
    }

    .error-message {
        color: var(--cancel-color);
    }
`;

function Login(props: IProps) {
    const ctx = useContext(MainAppContext);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('jessica.knebl@gmail.com');
    const [password, setPassword] = useState('australia54!');
    const onClick = async () => {
        if (email.length && password.length) {
            const data = await ctx.login(email, password);
            if (data.errors && data.errors.length) {
                let errorStrings: string[] = data.errors.map(
                    err => err.message
                );
                setError(
                    reduceStrings([
                        'Uh Oh, something went Wrong.',
                        ...errorStrings,
                    ])
                );
            } else {
                Router.push('/app/events');
            }
        }
    };

    useEffect(() => {
        setError(null);
    }, [email, password]);

    return (
        <StyledLogin>
            <p className='page-title'>Login</p>
            {error && <p className='error-message'>{error}</p>}
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

            <Button type='secondary' text='Log In' onClick={onClick} />
            <p className='signup-link'>
                Don't have an account?{' '}
                <Link href='/app/signup' shallow={true}>
                    <a>Create Account</a>
                </Link>
            </p>
        </StyledLogin>
    );
}

export default Login;
