import React, { useState, createContext } from 'react';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [accountInfo, setAccountInfo] = useState({ userId: '???', displayName: '???', role: 0, state: 0 });

    function updateToken(newToken) {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    }

    function updateAccountInfo(newUserId, newDisplayName, newRole, newState) {
        let updatedAccountInfo = JSON.parse(JSON.stringify(accountInfo));
        if (newUserId !== null) {
            updatedAccountInfo.userId = newUserId;
        }
        if (newDisplayName !== null) {
            updatedAccountInfo.displayName = newDisplayName;
        }
        if (newRole !== null) {
            updatedAccountInfo.role = newRole;
        }
        if (newState !== null) {
            updatedAccountInfo.state = newState;
        }
        setAccountInfo(updatedAccountInfo);
    }

    return <SessionContext.Provider value={{ token, updateToken, accountInfo, updateAccountInfo }}>{children}</SessionContext.Provider>;
};

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [unread, setUnread] = useState(0);

    return <NotificationContext.Provider value={{ unread, setUnread }}>{children}</NotificationContext.Provider>;
};
