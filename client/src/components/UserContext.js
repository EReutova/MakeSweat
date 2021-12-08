import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    //variable to hold current user
    const [currentUser, setCurrentUser] = useState(() => { 
        const user = sessionStorage.getItem("current-user");
        return user !== null ? JSON.parse(user) : null;    
    }) 

    //variable that is in charge of reRendering when it's neccessary
    const [reRender, setReRender] = useState(false);

    //variable to hold result of fetch of current user
    const [userInfo, setUserInfo] = useState(null);

    console.log(userInfo)

    useEffect(() => {
        fetch(`/user/${currentUser}`)
        .then(res => res.json())
        .then(data => {
            setUserInfo(data.result)
        })
        .catch((err) => {
            console.log("error");
        });
    }, []);

    return (
        <UserContext.Provider 
        value={{
            currentUser, setCurrentUser,
            reRender, setReRender
        }}>
            {children}
        </UserContext.Provider>
    )
}