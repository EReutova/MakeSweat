import React from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import Button from "./Button";

const ExerciseCard = ({exercise}) => {
    const history = useHistory()

    const handleToDetails = (id) => {
        history.push(`/exercise-details/${id}`);
    }
    return(
        <>
        {
            exercise && 
            <Wrapper key={exercise.id}>
                
                <Img src={exercise.gifUrl}/>
                <Info>
                    <Head>{exercise.name}</Head>
                    <P>Body part: {exercise.bodyPart}</P>
                    <P>Equipment: {exercise.equipment}</P>
                    <P>Target: {exercise.target}</P>
                </Info>
                <Button onClick={() => handleToDetails(exercise.id)}>View</Button>
            </Wrapper>
        }
        </>
    )
}

const Wrapper = styled.div`
    width: 400px;
    background: var(--color-silver);
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:hover{
        cursor: pointer;
        box-shadow: 0 0 15px var(--color-davys-grey);
    }
`;
const Img = styled.img`
    width: 90%;
    margin: 20px;
`;
const Info = styled.div`
    padding: 20px;
    width: 100%;
`;
const Head = styled.h3`
    font-size: 22px;
    text-align: center;
`;
const P = styled.p`
    font-size: 20px;
    margin: 10px;
`;

export default ExerciseCard;