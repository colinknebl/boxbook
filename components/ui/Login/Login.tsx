import { useContext, useRef } from 'react';
import Router from 'next/router';

import styled from 'styled-components';

import { ReactContext } from '../../../pages/_app';
import Input from '../Input';
import Button from '../Button';

interface IProps {}

const StyledLogin = styled.section`
    background: white;
    color: var(--secondary-color);
    box-shadow: var(--shadow-dreamy);
    text-align: center;
    margin: auto;
    padding: 20px;
    max-width: 400px;
    width: 100%;
    display: grid;
    grid-gap: 10px;

    p {
        margin: 0px 0 32px 0;
        font-size: 2rem;
        text-decoration: underline;
    }
`;

function Login(props: IProps) {
    const ctx = useContext(ReactContext);
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const onClick = async () => {
        if (emailInput.current.value && passwordInput.current.value) {
            const loggedInSuccessful = await ctx.login(
                emailInput.current.value,
                passwordInput.current.value
            );
            if (loggedInSuccessful) {
                Router.push('/app/events');
            }
        }
    };
    return (
        <StyledLogin>
            <p>Login</p>
            <Input ref={emailInput} type='text' placeholder='Email' required />
            <Input
                ref={passwordInput}
                type='password'
                placeholder='Password'
                required
            />

            <Button type='secondary' text='Login' onClick={onClick} />
        </StyledLogin>
    );
}

export default Login;
