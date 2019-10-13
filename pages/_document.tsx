import Document, {
    DocumentContext,
    Html,
    Main,
    Head,
    NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { default as AppHead } from '../components/ui/Head';

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <head>
                    <Head />
                    <AppHead />
                    <script
                        id='session'
                        type='application/json'
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({ foo: 'bar' }),
                        }}
                    />
                </head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
