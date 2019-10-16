import React from 'react';
import App, { AppContext } from 'next/app';
import jwt from 'jsonwebtoken';
import Head from '../components/ui/Head';
import { createGlobalStyle } from 'styled-components';
import cookie from 'cookie';

import { NavBar } from '../components/ui/NavBar';
import { State } from '../components/utils/State';
import { User } from '../components/models/User';

import { TOKEN_SIGNATURE } from '../.env/env';
import { TokenData } from '../graphql/resolvers/mutations';

const GlobalStyles = createGlobalStyle`
    :root {
        --primary-color: rgba(214, 181, 0, 1);
        --primary-color--hover: rgba(244, 207, 0, 1);
        --secondary-color: rgba(0, 35, 132, 1);
        --tertiary-color: rgba(35, 133, 216, 1);
        --confirm-color: rgba(170, 255, 118, 1);
        --confirm-color--hover: rgba(128, 213, 76, 1);
        --cancel-color: rgba(255, 73, 73, 1);
        --cancel-color--hover: rgba(207, 53, 53, 1);
        --page-padding: 1rem;

        --shadow-dreamy: 
            0 1px 2px rgba(0, 0, 0, 0.07),
            0 2px 4px rgba(0, 0, 0, 0.07),
            0 4px 8px rgba(0, 0, 0, 0.07),
            0 8px 16px rgba(0, 0, 0, 0.07),
            0 16px 32px rgba(0, 0, 0, 0.07),
            0 32px 64px rgba(0, 0, 0, 0.07);
        --shadow-long: 
            0 2px 1px rgba(0,0,0,0.09), 
            0 4px 2px rgba(0,0,0,0.09), 
            0 8px 4px rgba(0,0,0,0.09), 
            0 16px 8px rgba(0,0,0,0.09),
            0 32px 16px rgba(0,0,0,0.09);
        --shadow-short:
            0 1px 1px rgba(0,0,0,0.11), 
            0 2px 2px rgba(0,0,0,0.11), 
            0 4px 4px rgba(0,0,0,0.11), 
            0 6px 8px rgba(0,0,0,0.11),
            0 8px 16px rgba(0,0,0,0.11);
        --shadow-sharp:
            0 1px 1px rgba(0,0,0,0.25), 
            0 2px 2px rgba(0,0,0,0.20), 
            0 4px 4px rgba(0,0,0,0.15), 
            0 8px 8px rgba(0,0,0,0.10),
            0 16px 16px rgba(0,0,0,0.05);
        --shadow-diffuse: 
            0 1px 1px rgba(0,0,0,0.08), 
            0 2px 2px rgba(0,0,0,0.12), 
            0 4px 4px rgba(0,0,0,0.16), 
            0 8px 8px rgba(0,0,0,0.20);

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

interface IAppContext {
    login(email: string, password: string): Promise<boolean>;
}

export const ReactContext: React.Context<IAppContext> = React.createContext({
    login: async (email: string, password: string) => {
        return null;
    },
});

class MyApp extends App<{ user: User }> {
    // Only uncomment this method if you have blocking data requirements for
    // every single page in your application. This disables the ability to
    // perform automatic static optimization, causing every page in your app to
    // be server-side rendered.
    //
    static async getInitialProps(appContext: AppContext) {
        // calls page's `getInitialProps` and fills `appProps.pageProps`
        const appProps = await App.getInitialProps(appContext);

        let user: User = null;

        try {
            if (appContext.ctx.req) {
                // 1. get the token from the cookie
                const parsed = cookie.parse(
                    appContext.ctx.req.headers.cookie
                ) as {
                    token: string;
                };
                if (!parsed.token) {
                    throw new Error('No valid token found!');
                }
                // 2. Verify the token is valid
                const token = jwt.verify(
                    parsed.token,
                    process.env.TOKEN_SIGNATURE || TOKEN_SIGNATURE
                ) as TokenData;
                /**
                 3. If here, the token is valid - sets the userID, email, and isAuth 
                    keys on the context object which is then available in the GraphQL 
                    queries and mutations 'context' argument (3rd arg)
                 */
                user = await User.Fetch(token.userID);
            }
        } catch (err) {}

        const loginUrl = '/app/login';

        if (appContext.router.route !== loginUrl && !user) {
            if (appContext.ctx.res) {
                appContext.ctx.res.writeHead(302, {
                    Location: loginUrl,
                });
                appContext.ctx.res.end();
            } else {
                appContext.router.push(loginUrl);
            }
        }

        return { ...appProps, user };
    }

    state = {
        user: null,
    };

    render() {
        const { Component, pageProps } = this.props;

        return (
            <>
                <GlobalStyles />
                <Head />
                <ReactContext.Provider value={{ login: this.login }}>
                    <main id='App' className='App'>
                        <NavBar />
                        <div className='component-container'>
                            <Component {...pageProps} user={this.state.user} />
                        </div>
                    </main>
                </ReactContext.Provider>
            </>
        );
    }

    public componentDidMount() {
        if (this.props.user && !this.state.user) {
            this.setState({
                user: new User(this.props.user),
            });
        }
    }

    public login = async (email: string, password: string) => {
        let success: boolean = false;
        const user = await User.Login(email, password);
        if (user) {
            this.setState({
                user,
                organization: user.organizations[0],
            });
            success = true;
        }
        return success;
    };
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
