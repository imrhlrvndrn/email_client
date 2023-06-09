import { EmailClientLayout } from '@/layouts/emailclient.layout';
import { isPredefinedFolder, readJSONData } from '@/utils/json.utils';
import * as fs from 'fs';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function FolderSlug({ mail }) {
    const router = useRouter();
    const [mailData, setMailData] = useState(mail);

    useEffect(() => {
        if (!mailData?.subject) router?.back();

        () => {
            return localStorage.setItem('activeMail', JSON.stringify(mailData));
        };
    }, []);

    return (
        <>
            <Head>
                <title>Outlook</title>
                <meta name='description' content='Generated by create next app' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <EmailClientLayout />
        </>
    );
}

export async function getStaticPaths() {
    const files = await fs.promises.readdir(`${process.cwd()}/json`);
    let allMailFolders = [];

    for (let i = 0; i < files?.length; i++) {
        if (files[i] === 'custom-folders.json') {
            const customFolders = await readJSONData(`${process.cwd()}/json/${files[i]}`);

            for (let i = 0; i < customFolders?.folders?.length; i++) {
                for (let j = i; j < customFolders?.folders[i]?.mails?.length; j++) {
                    allMailFolders.push({
                        mId: customFolders?.folders[i]?.mails[j]?.mId,
                        folderSlug: customFolders?.folders[i]?._id,
                    });
                }
            }
        } else {
            const folder = await readJSONData(`${process.cwd()}/json/${files[i]}`);
            for (let i = 0; i < folder?.mails?.length; i++) {
                allMailFolders.push({
                    mId: folder?.mails[i]?.mId,
                    folderSlug: folder?.name,
                });
            }
        }
    }
    return {
        paths: allMailFolders?.map((slug) => ({ params: slug })),
        // [
        //     ({ params: { id: '1' } }, { params: { id: '2' } })
        // ],
        fallback: false, // can also be true or 'blocking'
    };
}

export async function getStaticProps(context) {
    let res;
    if (await isPredefinedFolder(context?.params?.folderSlug)) {
        //  Reading folder data from predefined folders
        res = await readJSONData(`${process.cwd()}/json/${context.params.folderSlug}.json`);
        res = res?.mails?.find((mail) => mail?.mId === context?.params?.mId);
    } else {
        //  Reading folder data from custom user folders
        const customFolders = await readJSONData(`${process.cwd()}/json/custom-folders.json`);
        res =
            customFolders?.folders
                ?.find((folder) => folder?._id === context?.params?.folderSlug)
                ?.mails?.find((mail) => mail?.mId === context?.params?.mId) || {};
    }

    return {
        props: {
            mail: res,
        },
    };
}
