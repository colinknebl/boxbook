import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import MainAppContext from '../context/MainAppContext';

const StyledNavMenu: any = styled.section`
    font-size: 1.5rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    height: 100%;
    background: var(--tertiary-color);
    width: 90vw;
    max-width: 400px;
    transition: all var(--transition-duration) ease-in-out;
    transform: ${(props: any) =>
        !props.open
            ? 'translateX(-110%) skew(-3deg)'
            : 'translateX(-10%) skew(-3deg)'};

    .inner-container {
        color: var(--white);
        height: 100%;
        width: 80%;
        margin: auto;
        transform: skew(3deg);
        position: relative;
    }

    .close-button {
        border: none;
        color: var(--white);
        position: absolute;
        top: 1rem;
        right: -2rem;
        padding: 0.5rem;
        border-radius: 5px;

        transition: all var(--transition-duration) ease-in-out;

        &:hover {
            background: var(--tertiary-color--hover);
        }
    }

    .link-container {
        padding: 1rem;
        display: flex;
        grid-gap: 1rem;
        flex-direction: column;
        height: 50%;
        justify-content: center;

        a,
        button {
            margin-bottom: 1rem;
            text-transform: uppercase;
            text-decoration: none;
            color: var(--white);

            &:hover {
                text-decoration: underline;
            }
        }

        button {
            border: none;
            text-align: left;
            padding: 0;
        }
    }
`;

interface IProps {
    open: boolean;
    toggle: () => void;
}

class NavMenu extends React.PureComponent<IProps> {
    render() {
        return (
            <MainAppContext.Consumer>
                {ctx => (
                    <StyledNavMenu
                        onClick={this.props.toggle}
                        open={this.props.open}
                    >
                        <div className='inner-container'>
                            <button className='close-button'>Close</button>
                            <div className='link-container'>
                                {ctx.user && (
                                    <>
                                        <Link href='/app/events' shallow={true}>
                                            <a>Events</a>
                                        </Link>
                                        <button onClick={ctx.logout}>
                                            Log Out
                                        </button>
                                    </>
                                )}
                                {!ctx.user && (
                                    <>
                                        <Link href='/app/login' shallow={true}>
                                            <a>Log In</a>
                                        </Link>
                                        <Link href='/app/signup' shallow={true}>
                                            <a>Sign Up</a>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </StyledNavMenu>
                )}
            </MainAppContext.Consumer>
        );
    }
}

export default NavMenu;
