import React from 'react';
import App, { AppContext } from 'next/app';
import Head from '../src/components/ui/Head';

import GlobalStyles from '../src/components/ui/GlobalStyles';
import { NavBar } from '../src/components/ui/NavBar';
import { User } from '../src/components/models/User';
import { getTokenFromCookie } from '../src/components/utils/Auth/getTokenFromCookie';
import MainAppContext from '../src/components/ui/context/MainAppContext';

class MyApp extends App<{ user: User; isClient: boolean }> {
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
                const token = getTokenFromCookie(appContext);
                /**
                 3. If here, the token is valid - sets the userID, email, and isAuth 
                    keys on the context object which is then available in the GraphQL 
                    queries and mutations 'context' argument (3rd arg)
                 */
                user = await User.Fetch(token.userID);
            }
        } catch (err) {}

        return { ...appProps, user, isClient: Boolean(appContext.ctx.req) };
    }

    state = {
        user: null,
    };

    render() {
        const { Component, pageProps, isClient } = this.props;

        return (
            <>
                <GlobalStyles />
                <Head />
                <MainAppContext.Provider value={{ login: this.login }}>
                    <main id='App' className='App'>
                        <NavBar />
                        <div className='component-container'>
                            <Component
                                {...pageProps}
                                user={this.state.user}
                                isClient={isClient}
                            />
                        </div>
                    </main>
                </MainAppContext.Provider>
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

export default MyApp;
