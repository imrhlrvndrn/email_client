// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { deleteMail, toggleMailFlag } from '@/utils/mail.utils';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { mId, folderName, action } = req.body;

        switch (action) {
            case 'DELETE_MAIL': {
                const updatedFolderData = await deleteMail(mId, folderName);
                res.status(200).json({ folder: updatedFolderData });
                break;
            }

            case 'TOGGLE_FLAG_STATUS': {
                const updatedFlaggedMails = await toggleMailFlag(mId, folderName);
                res.status(200).json({ flaggedMails: updatedFlaggedMails });
            }

            default:
                break;
        }
    }
}
