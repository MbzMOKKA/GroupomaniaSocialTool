import React, { useState, createContext } from 'react';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [accountId, setAccountId] = useState('???');
    const [accountDisplayName, setAccountDisplayName] = useState('???');

    const updateToken = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    return <SessionContext.Provider value={{ token, updateToken, accountId, setAccountId, accountDisplayName, setAccountDisplayName }}>{children}</SessionContext.Provider>;
};
