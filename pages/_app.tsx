import React from 'react';
import App from 'next/app';
import Head from '../components/ui/Head';
import { createGlobalStyle } from 'styled-components';

import { NavBar } from '../components/ui/NavBar';
import { State } from '../components/utils/State';
import { User } from '../components/models/User';

const GlobalStyles = createGlobalStyle`
    :root {
        --primary-color: rgba(214, 181, 0, 1);
        --secondary-color: rgba(0, 35, 132, 1);
        --tertiary-color: rgba(35, 133, 216, 1);
        --confirm-color: rgba(170, 255, 118, 1);
        --confirm-color--hover: rgba(128, 213, 76, 1);
        --cancel-color: rgba(255, 73, 73, 1);
        --cancel-color--hover: rgba(207, 53, 53, 1);
        --page-padding: 1rem;

        --white: whitesmoke;
        --black: #333;
        --transition-duration: 200ms;
        --button-border-radius: 10px;

        --background: whitesmoke;
        --text-color: var(--black);
    }

    @media (prefers-color-scheme: dark) {
        /* :root {
            --background: var(--black);
            --text-color: var(--white);
        } */
    }

    * {
        box-sizing: border-box;
    }

    body {
        background: var(--background);
        color: var(--text-color);
        font-size: 16px; 
        font-family: 'Source Sans Pro', sans-serif;
        line-height: 1.4;
    }

    .component-container {
        padding: 1rem;
    }

    button {
        outline-color: var(--primary-color);
        background: inherit;
        cursor: pointer;
    }
`;

class MyApp extends App {
    // Only uncomment this method if you have blocking data requirements for
    // every single page in your application. This disables the ability to
    // perform automatic static optimization, causing every page in your app to
    // be server-side rendered.
    //
    // static async getInitialProps(appContext) {
    //   // calls page's `getInitialProps` and fills `appProps.pageProps`
    //   const appProps = await App.getInitialProps(appContext);
    //
    //   return { ...appProps }
    // }

    state = {
        user: null,
        organization: null,
    };

    render() {
        const { Component, pageProps } = this.props;

        return (
            <>
                <GlobalStyles />
                <Head />
                <main id='App' className='App'>
                    <NavBar />
                    <div className='component-container'>
                        <Component
                            {...pageProps}
                            user={this.state.user}
                            organization={this.state.organization}
                        />
                    </div>
                </main>
            </>
        );
    }

    componentDidMount() {
        if (!this.state.user) {
            const user = User.Fetch('5da3063ee03dd800077af939').then(user => {
                this.setState({
                    user,
                    organization: user.organizations[0],
                });
            });
        }
    }
}

function withState(App) {
    const WithState = (...all) => {
        return <App {...all} />;
    };
    WithState.displayName = 'test';
    App.Foo = 'bar';
    console.dir(App);
    return App;
}

export default MyApp;
