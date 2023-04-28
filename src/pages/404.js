import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function NotFound() {
    const router = useRouter();

    useEffect(() => {
        router.back();
    }, []);

    return (
        <>
            <Head>
                <title>Outlook</title>
                <meta name='description' content='Generated by create next app' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main>No page found.</main>
        </>
    );
}


