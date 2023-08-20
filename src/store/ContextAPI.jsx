import React, { useState } from 'react';
export const ContextAPI =React.createContext() //it's a context object


//context function also known as context provider

const ContextProvider=(props)=>{
    const token=!! localStorage.getItem("token")
    const [isToken,setisToken]=useState("token");
    const contextValue={
        isToken,
        setisToken
    }
return (
    <ContextAPI.Provider value={contextValue}>
        {props.children}
        
    </ContextAPI.Provider>
)

}
export default ContextProvider;

