import { useEffect, useRef, useState } from 'react';
import Folder from '@/assets/svg/folder.svg';
import RightChevron from '@/assets/svg/right_chevron.svg';
import {
    FolderGroupContent,
    FolderGroupHeading,
    FolderGroupWrapper,
    FolderItem,
} from './sidebar.styles';
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
            <FolderGroup title='Folders' folders={folders?.predefined} />
            <FolderGroup title='Custom folders' folders={folders?.custom} />
        </div>
    );
};

export const FolderGroup = ({ title, folders = [] }) => {
    const [showContent, setShowContent] = useState(true);
    const [targetHeight, setTargetHeight] = useState(0);
    const targetRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        setTargetHeight((prevState) => `${targetRef.current.scrollHeight}px`);
    }, []);

    return (
        <>
            <FolderGroupWrapper>
                <FolderGroupHeading onClick={() => setShowContent(() => !showContent)} disabled>
                    <Folder width={16} height={16} />
                    <h1>{title}</h1>
                </FolderGroupHeading>
                {showContent && (
                    <FolderGroupContent
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
                                    className={
                                        router.asPath.includes(folder?.route) ? 'active' : ''
                                    }
                                >
                                    <div className='folder_details'>
                                        <h1>{folder?.name?.split('-')?.join(' ')}</h1>
                                    </div>
                                    <span>{folder?.unreadCount}</span>
                                </FolderItem>
                            );
                        })}
                    </FolderGroupContent>
                )}
            </FolderGroupWrapper>
        </>
    );
};
