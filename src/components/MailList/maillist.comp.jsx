import SelectMail from '@/assets/svg/unread.svg';
import Trash from '@/assets/svg/trash.svg';
import Unflagged from '@/assets/svg/flag.svg';
import Flagged from '@/assets/svg/fill_flag.svg';
import {
    MailContent,
    MailItemWrapper,
    MailListHeader,
    MailListWrapper,
    MailWrapper,
} from './maillist.styles';
import { ToolbarButton } from '../shared/Button/button.styles';
import { useMailContext } from '@/context/MailContext/mail.context';
import { useRouter } from 'next/router';
import { useMailActions } from '@/hooks/useMailActions';
import { useEffect, useState } from 'react';

export const MailList = () => {
    const router = useRouter();
    const [flagFilter, setFlagFilter] = useState({ isActive: false, results: [] });
    const [{ activeFolder }, dispatchMail] = useMailContext();

    const renderMails = () => {
        if (flagFilter?.isActive)
            return flagFilter?.results?.map((mail) => <MailItem key={mail?.mId} mail={mail} />);
        return activeFolder?.mails?.map((mail) => <MailItem key={mail?.mId} mail={mail} />);
    };

    useEffect(() => {
        dispatchMail({
            type: 'SET_ACTIVE_FOLDER',
            payload: activeFolder?.name
                ? activeFolder
                : JSON.parse(localStorage.getItem('activeFolder')),
        });
    }, [activeFolder?.name]);

    if (!activeFolder?.mails?.length)
        return (
            <MailListWrapper
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
                <p>No mails to show.</p>
            </MailListWrapper>
        );

    return (
        <MailListWrapper>
            <MailListHeader>
                <h1>{activeFolder?.name?.split('-').join(' ')}</h1>
                <ToolbarButton
                    onClick={() =>
                        setFlagFilter((prevState) => ({
                            ...prevState,
                            isActive: !prevState?.isActive,
                            results: activeFolder?.mails?.filter((mail) =>
                                activeFolder?.flaggedMails?.includes(mail?.mId)
                            ),
                        }))
                    }
                >
                    {flagFilter?.isActive ? (
                        <Flagged width={22} height={22} />
                    ) : (
                        <Unflagged width={22} height={22} />
                    )}
                </ToolbarButton>
            </MailListHeader>
            <MailWrapper>{renderMails()}</MailWrapper>
        </MailListWrapper>
    );
};

export const MailItem = ({ mail }) => {
    const router = useRouter();
    const { folderSlug } = router?.query;
    const { subject, mId, content, unread } = mail;
    const { deleteMail, toggleFlagStatus } = useMailActions();
    const [{ activeMail, activeFolder }, dispatchMail] = useMailContext();

    useEffect(() => {}, [activeFolder?.flaggedMails]);

    return (
        <MailItemWrapper
            flagged={activeFolder?.flaggedMails?.includes(mId)}
            activeMail={activeMail?.mId === mId}
            unread={unread}
            onClick={() => {
                dispatchMail({ type: 'SET_ACTIVE_MAIL', payload: mail });
                router.push(`/mail/${folderSlug}/${mId}`);
            }}
        >
            {/* <Checkbox className='select_checkbox' width={20} height={20} /> */}
            <MailContent activeMail={activeMail?.mId === mId}>
                <div className='mail_title'>
                    <h1>{subject}</h1>
                    <div className='quick_actions'>
                        <ToolbarButton
                            onClick={(event) => {
                                event.stopPropagation();
                                toggleFlagStatus(mId);
                            }}
                        >
                            {activeFolder?.flaggedMails?.includes(mId) ? (
                                <Flagged style={{ opacity: '1' }} width={16} height={16} />
                            ) : (
                                <Unflagged width={16} height={16} />
                            )}
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={(event) => {
                                event.stopPropagation();
                                deleteMail(mId);
                            }}
                        >
                            <Trash width={16} height={16} />
                        </ToolbarButton>
                    </div>
                </div>
                <p>{content?.slice(0, 50)}...</p>
            </MailContent>
        </MailItemWrapper>
    );
};
