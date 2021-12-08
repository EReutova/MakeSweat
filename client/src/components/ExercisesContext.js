import React, { createContext, useState, useEffect, useContext } from "react";

import { UserContext } from "./UserContext";

export const ExercisesContext = createContext(null);

export const ExercisesProvider = ({ children }) => {

    const { reRender, userId } = useContext(UserContext);

    //variable to store data from fetch "/exercises"
    const [exercises, setExercises] = useState([]);

    //variables to hold start and limit for "Load more" button
    const [start, setStart] = useState(0);
    const [limit, setLimit] = useState(8);

    //variable to hold the search input value
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        fetch(`/exercises?searchRequest=${inputValue}&start=${start}&limit=${limit}`)
        .then(res => res.json())
        .then(data => {
            setExercises([...exercises, ...data.data])
        })
        .catch((err) => {
            console.log("error");
        });
    }, [start, userId]);
    
    return (
        <ExercisesContext.Provider value={{
            exercises,
            setExercises,
            start,
            setStart,
            limit,
            setLimit,
            inputValue, 
            setInputValue
        }}>
            {children}
        </ExercisesContext.Provider>
    )
}