import { initialMailState, mailReducers } from './mail.reducers';

const { createContext, useReducer, useContext } = require('react');

const MailContext = createContext(null);

export const useMailContext = () => useContext(MailContext);

export const MailProvider = ({ children }) => {
    return (
        <MailContext.Provider value={useReducer(mailReducers, initialMailState)}>
            {children}
        </MailContext.Provider>
    );
};
