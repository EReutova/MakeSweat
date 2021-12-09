import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    //variable to hold current user
    const [userId, setUserId] = useState(() => { 
        const user = sessionStorage.getItem("current-user");
        return user !== null ? JSON.parse(user) : null;    
    }) 

    //variable that is in charge of reRendering when it's neccessary
    const [reRender, setReRender] = useState(false);

    //variable to hold result of fetch of current user
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        if (userId !== null){
            fetch(`/user/${userId}`)
            .then(res => res.json())
            .then(data => {
                setCurrentUser(data.result)
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [reRender]);

    return (
        <UserContext.Provider 
        value={{
            userId, setUserId,
            reRender, setReRender,
            currentUser, setCurrentUser
        }}>
            {children}
        </UserContext.Provider>
    )
}