import Head from 'next/head';

function MyHead() {
    return (
        <Head>
            <title>Home</title>

            <link
                rel='stylesheet'
                href='https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css'
            />

            <link
                href='https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap'
                rel='stylesheet'
            ></link>
        </Head>
    );
}

export default MyHead;
