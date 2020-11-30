import React, {createContext, useState} from 'react';

//Implementing a context
export const Context = createContext();

export default ({
    children
}) => {
    const [test, setTest] = useState('hello')
    return (
        <Context.Provider value={{
            test: test, 
            setTest: setTest
        }}>{children}</Context.Provider>
    )    
}