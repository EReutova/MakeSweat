import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useParams } from "react-router";

const WorkoutDetails = () => {
    console.log("workouts det")
    // const { _id } = useParams();

    // //variable that holds workout details
    // const [chosenWorkout, setChosenWorkout] = useState({})

    // useEffect(() => {
    //     fetch(`/workout/${_id}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             // setChosenWorkout(data.result)
    //         })
    //         .catch((err) => {
    //             console.log("error");
    //         });
    // })

    return(
        <div>Details
        {/* {
            chosenWorkout &&
            <div>{chosenWorkout.name}</div>
        } */}
        </div>
    )
}

export default WorkoutDetails;