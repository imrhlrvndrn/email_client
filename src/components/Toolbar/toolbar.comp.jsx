import Unread from '@/assets/svg/unread.svg';
import Read from '@/assets/svg/read.svg';
import Archive from '@/assets/svg/archive.svg';
import Trash from '@/assets/svg/trash.svg';
import Flag from '@/assets/svg/flag.svg';
import { ToolbarButton } from '../shared/Button/button.styles';
import { ToolbarWrapper } from './toolbar.styles';
import { useMailContext } from '@/context/MailContext/mail.context';

export const Toolbar = () => {
    const [{ activeMail }] = useMailContext();
    return (
        <ToolbarWrapper>
            <ToolbarButton disabled={!activeMail?.mId} title='New mail' className='primary'>
                <Unread width={22} height={22} />
            </ToolbarButton>
            <ToolbarButton disabled={!activeMail?.mId} title='Delete'>
                <Trash width={20} height={20} />
            </ToolbarButton>
            <ToolbarButton disabled={!activeMail?.mId} title='Archive'>
                <Archive width={20} height={20} />
            </ToolbarButton>
            <ToolbarButton disabled={!activeMail?.mId} title='Read / Unread'>
                <Read width={22} height={22} />
            </ToolbarButton>
            <ToolbarButton disabled={!activeMail?.mId} title='Flag / Unflag'>
                <Flag width={22} height={22} />
            </ToolbarButton>
        </ToolbarWrapper>
    );
};
