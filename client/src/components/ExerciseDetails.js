import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";

import styled from "styled-components";

import { UserContext } from "./UserContext";
import Button from "./Button";
import Btn from "./Btn";

const ExerciseDetails = () => {
    const { id } = useParams();

    const { workouts, userId } = useContext(UserContext);

    //variable to store fetch result
    const [exercise, setExercise] = useState(null);

    //variable to store text area input
    const [description, setDescripton] = useState(null);

    const handleTextAreaInput = (ev) => {
        setDescripton(ev.target.value);
    }

    useEffect(() => {
        fetch(`/exercise/${id}`)
            .then((res) => res.json())
            .then((data) => setExercise(data.data))
            .catch((err) => {
                console.log("error");
            });
    }, [id]);

    const handleAddToWorkout = () => {
        if (userId){
            //will push Id of Exercise to the "workout" array
        }
        else{
            window.alert("Please log in and create a workout")
        }
    }

    const handleAddToFavorite = () => {
        if (userId){
            //will push Id of Exercise to the "favorites" array
        }
        else{
            window.alert("Please log in")
        }
    }

    return(
        <>
            {
                !exercise ? (
                    <p>loading</p>
                ) : (
                    <Wrapper>
                        <Img src={exercise.gifUrl}/>
                        <Info>
                            <H3>{exercise.name}</H3>
                            <Par>Body part: {exercise.bodyPart}</Par>
                            <Par>Equipment: {exercise.equipment}</Par>
                            <Par>Target: {exercise.target}</Par>
                            <Divv>
                                <p>Enter description</p>
                                <TextArea 
                                    value={description}
                                    onChange={handleTextAreaInput}
                                    placeholder="Such as 30 repetitions, 3 times" 
                                    multiline 
                                    rows={4}/>
                                    <Div>
                                        <Button onClick={handleAddToWorkout}>Add to favorites</Button>
                                        <Btn onClick={handleAddToFavorite}>Add to workout</Btn>
                                    </Div>
                            </Divv>
                        </Info>
                    </Wrapper>
                )
            }
        </>
    )
}

const Wrapper = styled.div`
    margin: auto;
    margin-top: 130px;
    width: 1200px;
    height: 600px;
    background: rgba(71, 72, 71, 0.7);
    color: #fff;
    display: flex;
    justify-content: center;
`;
const Img = styled.img`
    margin: auto;
    padding: 30px;
    width: 100%;
    height: 100%;
    flex: 1;
`;
const Info = styled.div`
    padding: 30px;
    flex: 1;
`;
const H3 = styled.h3`
    margin: 10px;
    font-size: 30px;
    text-align: center;
    text-transform: uppercase;
`;
const Par = styled.p`
    font-size: 26px;
    margin: 10px;
`;
const Divv = styled.form`
    margin: 10px;
    display: flex;
    flex-direction: column;
    font-size: 26px;
`;
const TextArea = styled.textarea`
    margin-top: 10px;
    border: none;
    font-size: 26px;
    resize: none;
`;
const Div = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 90px;
`;
export default ExerciseDetails;