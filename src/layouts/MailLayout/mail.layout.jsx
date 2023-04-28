import { Sidebar } from '@/components/Sidebar/sidebar.comp';
import { MailLayoutWrapper } from './mail.styles';
import { MailList } from '@/components/MailList/maillist.comp';
import { MailViewer } from '@/components/MailViewer/mailviewer.comp';

export const MailLayout = () => {
    return (
        <MailLayoutWrapper>
            <Sidebar />
            <MailList />
            <MailViewer />
        </MailLayoutWrapper>
    );
};
