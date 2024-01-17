// context to save user
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({
    user: null,
    setUser: () => {},
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(
       JSON.parse(localStorage.getItem('user')) || null
    );
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
        {children}
        </UserContext.Provider>
    );
    }
