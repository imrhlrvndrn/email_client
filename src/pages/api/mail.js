// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from 'fs';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        let inboxData = await JSON.parse(
            await fs.readFileSync(`${process.cwd()}/json/inbox.json`, 'utf-8')
        );
        await fs.writeFileSync(
            'json/inbox.json',
            JSON.stringify({ ...inboxData, name: 'rahul ravindran' }, null, 4)
        );

        console.log(process.cwd());
        inboxData = await JSON.parse(
            await fs.readFileSync(`${process.cwd()}/json/inbox.json`, 'utf-8')
        );

        res.status(200).json({ inbox: inboxData });
    }
}
