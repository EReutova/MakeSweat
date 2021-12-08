import React from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import Btn from "./Btn";

const ExerciseCard = ({exercise}) => {
    const history = useHistory()

    const handleToDetails = (id, ev) => {
        ev.stopPropagation()
        history.push(`/exercise-details/${id}`);
    }
    return(
        <>
        {
            exercise && 
            <Wrapper onClick={(ev) => handleToDetails(exercise.id, ev)}>
                
                <Img src={exercise.gifUrl}/>
                <Head>{exercise.name}</Head>
                <Btn onClick={(ev) => handleToDetails(exercise.id, ev)}>View</Btn>
            </Wrapper>
        }
        </>
    )
}

const Wrapper = styled.div`
    width: 400px;
    background: rgba(234, 235, 234, 0.7);
    margin: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:hover{
        cursor: pointer;
        box-shadow: 0 0 10px var(--color-davys-grey), 0 0 20px var(--color-davys-grey), 0 0 30px var(--color-davys-grey);

    }
`;
const Img = styled.img`
    width: 90%;
    margin: 20px;
`;
const Head = styled.h3`
    font-size: 22px;
    text-align: center;
    text-transform: uppercase;
`;


export default ExerciseCard;