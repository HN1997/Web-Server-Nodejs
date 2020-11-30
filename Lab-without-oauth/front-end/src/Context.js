import React, {createContext, useState} from 'react';

export const Context = createContext();

export default ({
    children
}) => {
    const [user, setUser] = useState(null)
    return (
        <Context.Provider value = {{
            user: user, 
            setUser: setUser
        }}>{children}</Context.Provider>
    )
}