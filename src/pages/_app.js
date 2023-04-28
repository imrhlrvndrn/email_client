import { MailProvider } from '@/context/MailContext/mail.context';
import { CustomThemeProvider } from '@/context/ThemeContext/theme.context';

export default function App({ Component, pageProps }) {
    return (
        <CustomThemeProvider>
            <MailProvider>
                <Component {...pageProps} />
            </MailProvider>
        </CustomThemeProvider>
    );
}
