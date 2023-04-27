import * as fs from 'fs';

export const readJSONData = async (path = '') => {
    const fileData = await JSON.parse(await fs.readFileSync(path, 'utf-8'));

    return fileData;
};


