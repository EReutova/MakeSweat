import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";

import { useParams } from "react-router";

import { UserContext } from "./UserContext";
import ExerciseCardForWorkout from "./ExerciseCardForWorkout";

const WorkoutDetails = () => {
    const { id } = useParams();

    const { reRender } = useContext(UserContext);

    //variable that holds workout details
    const [chosenWorkout, setChosenWorkout] = useState(null);

    useEffect(() => {
        fetch(`/workout/${id}`)
            .then(res => res.json())
            .then(data => {
                setChosenWorkout(data.result);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [reRender]);

    return(
        <Main>
            <Wrapper>
                {
                    chosenWorkout ? (
                        <>
                            <Name>{chosenWorkout.name}</Name>
                            <Par>Type: {chosenWorkout.type}</Par>
                            {
                                chosenWorkout?.exercises.length === 0 ? (
                                    <P>You didn't add any exercises yet</P>
                                ) : (
                                    <Div>
                                        {
                                            chosenWorkout?.exercises.map((exercise, index) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <ExerciseCardForWorkout chosenWorkout={chosenWorkout} exercise={exercise} id={id}/>
                                                    </React.Fragment>
                                                )
                                            })
                                        }
                                    </Div>
                                ) 
                            }
                        </>
                    ) : (
                        <Par>Loading</Par>
                    )
                }
            </Wrapper>
        </Main>
    )
}
const Main = styled.div`
    height: 100%;
    width: 100%;
    margin-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 75vh;
    width: 1200px;
    border-radius: 10px;
    margin: 30px;
    margin-right: 0 auto;
    box-shadow: -2px 2px 10px 5px #cacaca;
    background: rgba(71, 72, 71, 0.7);
`;
const Name = styled.h3`
    font-size: 30px;
    padding: 20px;
    width: 100%;
    text-align: center;
    color: var(--color-red-crayola);
    `;
const Par = styled.p`
    padding: 10px;
    text-align: center;
    font-size: 24px;
    color: #fff;
    border-bottom: 2px solid var(--color-charlestone-green);
`;
const P = styled.p`
    padding: 10px;
    text-align: center;
    font-size: 22px;
    color: #fff;
`;
const Div = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

export default WorkoutDetails;