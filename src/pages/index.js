import Head from 'next/head';
import Image from 'next/image';
// import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { readJSONData } from '@/utils/json.utils';
import { useState } from 'react';

// const inter = Inter({ subsets: ['latin'] });

export default function Home({ post }) {
    const [postData, setPostData] = useState(post?.name);
    const updateData = async () => {
        const response = await fetch('http://localhost:3000/api/mail', {
            method: 'POST',
        });
        const data = await response.json();
        console.log('data', data);
        setPostData(data?.inbox?.name);
    };

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name='description' content='Generated by create next app' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main>
                <h1 onClick={() => updateData()}>{postData}</h1>
            </main>
        </>
    );
}

export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await readJSONData('json/inbox.json');

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            post: res,
        },
    };
}
