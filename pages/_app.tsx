import React from 'react';
import App from 'next/app';
import Head from '../components/ui/Head';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    :root {
        --primary-color: rgba(214, 181, 0, 1);
        --secondary-color: rgba(0, 35, 132, 1);
        --tertiary-color: rgba(35, 133, 216, 1);
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

    render() {
        const { Component, pageProps } = this.props;
        // console.log('TCL: MyApp -> render -> Component', Component);
        // console.log('TCL: MyApp -> render -> pageProps', pageProps);
        return (
            <>
                <GlobalStyles />
                <Head />
                <Component {...pageProps} />
            </>
        );
    }
}

export default MyApp;
