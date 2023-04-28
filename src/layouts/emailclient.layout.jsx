// import { Inter } from 'next/font/google';
import { Header } from '@/components/Header/header.comp';
import { Toolbar } from '@/components/Toolbar/toolbar.comp';
import { MailLayout } from './MailLayout/mail.layout';

// const inter = Inter({ subsets: ['latin'] });

export const EmailClientLayout = () => {
    return (
        <main style={{ display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Toolbar />
            <MailLayout />
        </main>
    );
};
