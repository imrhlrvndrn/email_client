import Head from 'next/head';

export const NextHead = ({
    title = 'Outlook',
    description = 'Outlook Email Client (Prototype)',
}) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <link rel='icon' href='/favicon.ico' />
            <link rel='preconnect' href='https://fonts.googleapis.com' />
            <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
            <link
                href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap'
                rel='stylesheet'
            />
        </Head>
    );
};
