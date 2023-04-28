import SelectMail from '@/assets/svg/unread.svg';
import { MailViewerContent, MailViewerSubject, MailViewerWrapper } from './mailviewer.styles';
import { useMailContext } from '@/context/MailContext/mail.context';
import { useEffect } from 'react';

export const MailViewer = () => {
    const [{ activeMail }, dispatchMail] = useMailContext();
    const { subject, content } = activeMail;

    useEffect(() => {
        dispatchMail({
            type: 'SET_ACTIVE_MAIL',
            payload: activeMail?.subject
                ? activeMail
                : JSON.parse(localStorage.getItem('activeMail')),
        });

        () => localStorage.setItem('activeMail', JSON.stringify(activeMail));
    }, []);

    return (
        <MailViewerWrapper>
            {!activeMail?.mId ? (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 'calc(100vh - 150px)',
                    }}
                >
                    <SelectMail width={62} height={62} />
                    <img src='@/assets/svg/select_mail.svg' alt='' />
                    <p>Select a mail to read</p>
                </div>
            ) : (
                <>
                    <MailViewerSubject>Subject: {subject}</MailViewerSubject>
                    <MailViewerContent>{content}</MailViewerContent>
                </>
            )}
        </MailViewerWrapper>
    );
};
