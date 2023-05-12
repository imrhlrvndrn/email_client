// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { readJSONData } from '@/utils/json.utils';
import * as fs from 'fs';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // [GET] NEXT_PUBLIC_ENDPOINT/api/mail/folders

        let folders = { predefined: [], custom: [] };
        const files = await fs.promises.readdir(`${process.cwd()}/json`);

        for (let i = 0; i < files.length; i++) {
            const folderData = await readJSONData(`${process.cwd()}/json/${files[i]}`);

            if (files[i] !== 'custom-folders.json') {
                folders.predefined.push({
                    _id: `${files[i]?.split('.json')[0]}${i}`,
                    name: `${files[i]?.split('.json')[0]}`,
                    unreadCount: folderData?.mails?.filter((mail) => mail?.unread)?.length,
                    is_active: false,
                    route: `/mail/${files[i]?.split('.json')[0]}`,
                    mailRoute: `/mail/${files[i]?.split('.json')[0]}`,
                });
            } else {
                for (let i = 0; i < folderData?.folders?.length; i++) {
                    folders.custom.push({
                        _id: `${files[i]?.split('.json')[0]}${i}`,
                        name: `${folderData?.folders?.[i]?.name}`,
                        unreadCount: folderData?.folders?.[i]?.mails?.filter((mail) => mail?.unread)
                            ?.length,
                        is_active: false,
                        route: `/mail/${folderData?.folders?.[i]?._id}`,
                        mailRoute: `/mail/${folderData?.folders?.[i]?._id}`,
                    });
                }
            }
        }

        res.status(200).json({ folders });
    }
}
