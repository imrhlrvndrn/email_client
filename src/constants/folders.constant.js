import Inbox from '@/assets/svg/inbox.svg';
import Spam from '@/assets/svg/spam.svg';
import Trash from '@/assets/svg/trash.svg';

export const folders = [
    {
        _id: 1,
        name: 'inbox',
        icon: Inbox,
        unread_count: 0,
        is_active: true,
        route: '/mail/inbox',
    },
    {
        _id: 2,
        name: 'spam',
        icon: Spam,
        unread_count: 0,
        is_active: false,
        route: '/mail/spam',
    },
    {
        _id: 3,
        name: 'deleted items',
        icon: Trash,
        unread_count: 0,
        is_active: false,
        route: '/mail/deleted-items',
    },
];
