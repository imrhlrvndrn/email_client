export const initialMailState = {
    folders: {
        inbox: {
            mails: [],
            flagged_mails: [],
            unread_count: 0,
        },
        spam: {
            mails: [],
            flagged_mails: [],
            unread_count: 0,
        },
        deleteditems: {
            mails: [],
            flagged_mails: [],
            unread_count: 0,
        },
        customfolders: [],
    },
    activeMail: {},
    activeFolder: {},
};

export const mailReducers = (state, action) => {
    switch (action?.type) {
        case 'INITIAL_FETCH': {
            localStorage.setItem('folders', JSON.stringify(action?.payload));
            return { ...state, folders: action?.payload };
        }

        case 'SET_ACTIVE_MAIL': {
            return { ...state, activeMail: action?.payload };
        }

        case 'SET_ACTIVE_FOLDER': {
            return {
                ...state,
                activeFolder: action?.payload,
            };
        }

        default:
            return { ...state };
    }
};
