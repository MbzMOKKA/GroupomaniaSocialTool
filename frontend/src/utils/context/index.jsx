import React, { useState, createContext } from 'react';

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const updateToken = (newToken) => {
        setToken(newToken);
    };

    return <TokenContext.Provider value={{ token, updateToken }}>{children}</TokenContext.Provider>;
};
