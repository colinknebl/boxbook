import React from 'react';
import App, { AppContext } from 'next/app';
import Head from '../src/components/ui/Head';

import GlobalStyles from '../src/components/ui/GlobalStyles';
import Nav from '../src/components/ui/Nav';
import { User } from '../src/components/models/User';
import { getValidUser } from '../src/components/utils/Auth/getValidUser';
import MainAppContext, {
    IMainAppContext,
} from '../src/components/ui/context/MainAppContext';
import { redirect } from '../src/components/utils/redirect';

interface IProps {
    user: any;
}

interface IState {
    user: User;
}

class MyApp extends App<IProps, IState> {
    // Only uncomment this method if you have blocking data requirements for
    // every single page in your application. This disables the ability to
    // perform automatic static optimization, causing every page in your app to
    // be server-side rendered.
    //
    static async getInitialProps(appContext: AppContext) {
        // calls page's `getInitialProps` and fills `appProps.pageProps`
        const appProps = await App.getInitialProps(appContext);

        let user = null;

        try {
            user = await getValidUser(appContext.ctx.req);
        } catch (err) {}

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
                <MainAppContext.Provider value={this._getContextValue()}>
                    <main id='App' className='App'>
                        <Nav />
                        <div className='component-container'>
                            <Component {...pageProps} user={this._getUser()} />
                        </div>
                    </main>
                </MainAppContext.Provider>
            </>
        );
    }

    private _getUser(): User {
        let user = this.state.user || this.props.user;

        if (user && !(user instanceof User)) {
            user = new User(user);
        }

        return user;
    }

    private _getContextValue(): IMainAppContext {
        return {
            login: this.login,
            logout: this.logout,
            user: this._getUser(),
        };
    }

    public componentDidMount() {
        if (this.props.user && !this.state.user) {
            this.setState({
                user: new User(this.props.user),
            });
        }
    }

    public logout = () => {
        try {
            User.Logout();
            redirect(null, '/app/login');
            this.setState({
                user: null,
            });
            return true;
        } catch (error) {
            return false;
        }
    };

    public login = async (
        email: string,
        password: string
    ): Promise<{ user: User; errors: Error[] }> => {
        const data = await User.Login(email, password);
        if (data.user) {
            this.setState({
                user:
                    data.user instanceof User ? data.user : new User(data.user),
                organization: data.user.organizations[0],
            });
        }
        return data;
    };
}

export default MyApp;
