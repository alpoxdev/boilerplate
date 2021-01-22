import React from 'react';
import App from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

// redux
import { wrapper } from 'stores';
import { ReactReduxContext } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// components
import { Layout, DefaultHelmet } from 'components';
import { theme } from 'config';

const isBrowser = () => typeof window !== 'undefined';

export const GlobalStyle = createGlobalStyle`
    html,
    body {
        margin: 0;
    }

    * {
        box-sizing: border-box;
    }
`;

class WrappedApp extends App {
    static getInitialProps = async ({ Component, ctx }) => {
        const page = isBrowser() ? 'client' : 'server';
        ctx.store.dispatch({ type: 'PAGE', payload: page });

        return {
            pageProps: {
                ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
                appProp: ctx.pathname,
            },
            store: ctx.store,
        };
    };

    render() {
        const { Component, pageProps } = this.props;

        return isBrowser() ? (
            <>
                <DefaultHelmet />
                <ReactReduxContext.Consumer>
                    {({ store }) => (
                        <PersistGate persistor={store.__persistor}>
                            <ThemeProvider theme={theme}>
                                <Layout>
                                    <Component {...pageProps} />
                                </Layout>
                            </ThemeProvider>
                        </PersistGate>
                    )}
                </ReactReduxContext.Consumer>
            </>
        ) : (
            <>
                <DefaultHelmet />
                <ThemeProvider theme={theme}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </>
        );
    }
}

export default wrapper.withRedux(WrappedApp);
