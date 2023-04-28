import { useEffect, useRef, useState } from 'react';
import Folder from '@/assets/svg/folder.svg';
import RightChevron from '@/assets/svg/right_chevron.svg';
import { AccordionContent, AccordionHeading, AccordionWrapper, FolderItem } from './sidebar.styles';
import { useMailContext } from '@/context/MailContext/mail.context';
import { useRouter } from 'next/router';

export const Sidebar = () => {
    const [folders, setFolders] = useState({});
    const [_, dispatchMail] = useMailContext();

    useEffect(() => {
        const sidebarFolders = localStorage.getItem('sidebarFolders');
        if (sidebarFolders?.predefined) setFolders((prevState) => sidebarFolders);
        else
            (async () => {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_ENDPOINT}/api/mail/folders`
                );
                const { folders } = await response.json();

                setFolders((prevState) => folders);
                localStorage.setItem('sidebarFolders', JSON.stringify(folders));
            })();
    }, []);

    if (!folders?.predefined) return null;

    return (
        <div>
            <Accordion title='Folders' folders={folders?.predefined} />
            <Accordion title='Custom folders' folders={folders?.custom} />
        </div>
    );
};

export const Accordion = ({ title, folders = [] }) => {
    const [showContent, setShowContent] = useState(true);
    const [targetHeight, setTargetHeight] = useState(0);
    const targetRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        setTargetHeight((prevState) => `${targetRef.current.scrollHeight}px`);
    }, []);

    return (
        <>
            <AccordionWrapper>
                <AccordionHeading /*onClick={() => setShowContent(() => !showContent)}*/ disabled>
                    <Folder width={16} height={16} />
                    <h1>{title}</h1>
                </AccordionHeading>
                <AccordionContent
                    targetHeight={targetHeight}
                    ref={targetRef}
                    className={showContent ? 'animated' : ''}
                >
                    {folders?.map((folder) => {
                        return (
                            <FolderItem
                                href={`${folder?.route}`}
                                onClick={() => router.push(`${folder?.route}`)}
                                key={folder?._id}
                                className={router.asPath.includes(folder?.route) ? 'active' : ''}
                            >
                                {/* <div className='link_wrapper'> */}
                                <div className='folder_details'>
                                    <h1 style={{ textTransform: 'capitalize' }}>
                                        {folder?.name?.split('-')?.join(' ')}
                                    </h1>
                                </div>
                                <span>{folder?.unreadCount}</span>
                                {/* </div> */}
                            </FolderItem>
                        );
                    })}
                </AccordionContent>
            </AccordionWrapper>
        </>
    );
};
