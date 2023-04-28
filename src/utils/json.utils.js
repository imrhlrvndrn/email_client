import * as fs from 'fs';

export const readJSONData = async (path = '') => {
    const fileData = await JSON.parse(await fs.promises.readFile(path, 'utf-8'));

    return fileData;
};

export const writeData = async (filePath = '', data) => {
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 4));
};

export const isPredefinedFolder = async (folderName = '') => {
    const files = (await fs.promises.readdir(`${process.cwd()}/json`)) || [];
    return files.includes(`${folderName}.json`);
};
