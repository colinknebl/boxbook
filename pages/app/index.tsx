import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { StyledButton } from '../../src/components/ui/Button';

const StyledSection = styled.section`
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    &:after {
        content: '';
        z-index: -1;
        background-image: url('../static/images/gym-background.jpg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        filter: grayscale(100%) blur(2px);
    }

    button {
        width: 200px;
        margin-bottom: 20px;
        background: var(--secondary-color);
        color: var(--white);

        &:hover {
            background: var(--tertiary-color);
        }

        &:last-of-type {
            margin-bottom: 100px;
        }
    }

    a {
        text-decoration: none;
    }
`;

class App extends React.PureComponent {
    render() {
        return (
            <StyledSection className='app-landing-page'>
                <Link href='/app/signup' shallow={true}>
                    <StyledButton>Create Account</StyledButton>
                </Link>

                <Link href='/app/login' shallow={true}>
                    <StyledButton>Login</StyledButton>
                </Link>
            </StyledSection>
        );
    }
}

export default App;
