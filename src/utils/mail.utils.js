import { isPredefinedFolder, readJSONData, writeData } from './json.utils';

// * Delete mail actions
export async function deleteMail(mId, folderName) {
    const isPredefined = await isPredefinedFolder(folderName);
    const { mailToBeDeleted, updatedFolderData } = isPredefined
        ? await deleteFromPredefinedFolder(mId, folderName)
        : await deleteFromCustomFolders(mId, folderName);

    await updateDeletedItemsFolder(mailToBeDeleted);

    return updatedFolderData;
}

export async function deleteFromCustomFolders(mId, folderName) {
    const currentFolderData = await readJSONData(`${process.cwd()}/json/custom-folders.json`);

    const mailToBeDeleted = currentFolderData?.folders
        ?.find((folder) => folder?._id === folderName)
        ?.mails?.filter((mail) => mail?.mId === mId)[0];

    const updatedFolderData = {
        ...currentFolderData,
        folders: [
            ...currentFolderData?.folders?.map((folder) =>
                folder?._id === folderName
                    ? {
                          ...folder,
                          mails: folder?.mails?.filter((mail) => mail?.mId !== mId),
                      }
                    : folder
            ),
        ],
    };

    await writeData(`${process.cwd()}/json/custom-folders.json`, updatedFolderData);

    return {
        mailToBeDeleted,
        updatedFolderData: {
            ...updatedFolderData?.folders?.find((folder) => folder?._id === folderName),
        },
    };
}

export async function deleteFromPredefinedFolder(mId, folderName) {
    const currentFolderData = await readJSONData(`${process.cwd()}/json/${folderName}.json`);

    const mailToBeDeleted = currentFolderData?.mails?.filter((mail) => mail?.mId === mId)[0];

    const updatedFolderData = {
        ...currentFolderData,
        mails: currentFolderData?.mails?.filter((mail) => mail?.mId !== mId),
    };

    await writeData(`${process.cwd()}/json/${folderName}.json`, updatedFolderData);

    return { mailToBeDeleted, updatedFolderData };
}

export async function updateDeletedItemsFolder(mailToBeDeleted) {
    const deletedItemsFolder = await readJSONData(`${process.cwd()}/json/deleted-items.json`);

    const updatedDeletedItemsFolder = {
        ...deletedItemsFolder,
        mails: [...deletedItemsFolder?.mails, mailToBeDeleted],
    };

    await writeData(`${process.cwd()}/json/deleted-items.json`, updatedDeletedItemsFolder);
}

// * Flag mail actions
export async function toggleMailFlag(mId, folderName) {
    // Predefined folder operations
    const isPredefined = await isPredefinedFolder(folderName);
    const updatedFlaggedMails = isPredefined
        ? await togglePredefinedFolderMail(mId, folderName)
        : await toggleCustomFolderMail(mId, folderName);

    return updatedFlaggedMails;
}

export async function togglePredefinedFolderMail(mId, folderName) {
    console.log('toggle mail predefined...');
    const currentFolderData = await readJSONData(`${process.cwd()}/json/${folderName}.json`);

    const mailToBeFlagged = currentFolderData?.mails?.filter((mail) => mail?.mId === mId)[0];
    const isFlagged = currentFolderData?.flaggedMails?.includes(mailToBeFlagged?.mId);
    console.log('before toggle => ', { currentFolderData, mailToBeFlagged, isFlagged });

    const updatedFolderData = {
        ...currentFolderData,
        flaggedMails: isFlagged
            ? currentFolderData?.flaggedMails?.filter((mailId) => mailId !== mId)
            : [...currentFolderData?.flaggedMails, mailToBeFlagged?.mId],
    };

    await writeData(`${process.cwd()}/json/${folderName}.json`, updatedFolderData);

    return updatedFolderData?.flaggedMails;
}

export async function toggleCustomFolderMail(mId, folderName) {
    const currentFolderData = await readJSONData(`${process.cwd()}/json/custom-folders.json`);

    const mailFolder = currentFolderData?.folders?.find((folder) => folder?._id === folderName);
    const mailToBeFlagged = mailFolder?.mails?.find((mail) => mail?.mId === mId);
    const isFlagged = mailFolder?.flaggedMails?.includes(mailToBeFlagged?.mId);

    const updatedFolderData = {
        ...currentFolderData,
        folders: currentFolderData.folders?.map((folder) =>
            folder?._id === folderName
                ? {
                      ...folder,
                      flaggedMails: isFlagged
                          ? folder?.flaggedMails?.filter((mailId) => mailId !== mId)
                          : [...folder?.flaggedMails, mailToBeFlagged?.mId],
                  }
                : folder
        ),
    };

    await writeData(`${process.cwd()}/json/custom-folders.json`, updatedFolderData);

    return updatedFolderData?.folders?.find((folder) => folder?._id === folderName)?.flaggedMails;
}
