import React, { createContext, useState, useEffect } from "react";

export const ExercisesContext = createContext(null);

export const ExercisesProvider = ({ children }) => {
    //variable to store data from fetch "/exercises"
    const [exercises, setExercises] = useState([]);

    const [exercisesById, setExercisesById] = useState({});

    const [exercisesByEquipmentType, setExercisesByEquipmentType] = useState({});


    useEffect(() => {
        fetch('/exercises')
        .then(res => res.json())
        .then(data => {
            setExercises(data.data)
        })
        .catch((err) => {
            console.log("error");
        });
    }, []);
    
    return (
        <ExercisesContext.Provider value={{
            exercises,
            setExercises
        }}>
            {children}
        </ExercisesContext.Provider>
    )
};