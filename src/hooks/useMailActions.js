import { useMailContext } from '@/context/MailContext/mail.context';
import { useRouter } from 'next/router';

export const useMailActions = () => {
    const router = useRouter();
    const { folderSlug } = router?.query;
    const [{ activeMail, activeFolder }, dispatchMail] = useMailContext();

    const deleteMail = async (mId) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/mail`, {
            method: 'POST',
            body: JSON.stringify({ mId, folderName: folderSlug, action: 'DELETE_MAIL' }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const { folder } = await response.json();

        if (activeMail?.mId === mId) {
            router?.push(`/mail/${folderSlug}`);
            dispatchMail({ type: 'SET_ACTIVE_MAIL', payload: {} });
        }
        dispatchMail({ type: 'SET_ACTIVE_FOLDER', payload: folder });
    };

    const toggleFlagStatus = async (mId) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/mail`, {
            method: 'POST',
            body: JSON.stringify({ mId, folderName: folderSlug, action: 'TOGGLE_FLAG_STATUS' }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const { flaggedMails } = await response.json();

        dispatchMail({ type: 'SET_ACTIVE_FOLDER', payload: { ...activeFolder, flaggedMails } });
    };

    return { deleteMail, toggleFlagStatus };
};
