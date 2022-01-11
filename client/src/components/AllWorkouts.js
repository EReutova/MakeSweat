import React, {useEffect, useState} from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import Btn from "./Btn";

const AllWorkouts = () => {
    const history = useHistory();

    const [workouts, setWorkouts] = useState(null);

    useEffect(() => {
        fetch(`/workouts`)
        .then(res => res.json())
        .then(data => {
            setWorkouts(data.data)
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    //function that redirects to workout details page
    const handleToWorkoutDetails = (id) => {
        history.push(`/workout/${id}`);
    }

    return(
        <Main>
            <Wrapper>
                <WorkoutsInfo>
                    <Name>Workouts</Name>
                    {
                        workouts &&
                        workouts.map((workout, index)=> {
                            return(
                                <Container key={index}>
                                    <Wrap>
                                        <NewBtn 
                                            onClick={()=> {handleToWorkoutDetails(workout._id)}}
                                        >
                                        <Span>{workout.name}:</Span> {workout.type}</NewBtn>
                                        <Btn onClick={()=> {handleToWorkoutDetails(workout._id)}}>View</Btn>
                                    </Wrap>
                                </Container>
                            )
                        })
                    }
                </WorkoutsInfo>
            </Wrapper>
        </Main>
    )
}

const Main = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Wrapper = styled.div`
    display: flex;
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
    padding: 10px;
    text-align: center;
    color: var(--color-red-crayola);
    border-bottom: 2px solid var(--color-charlestone-green);
`;
const FavBtn = styled.button`
    padding: 10px;
    font-size: 24px;
    color: var(--color-red-crayola);
    font-weight: 700;
    text-align: center;
    background: transparent;
    border: none;
    cursor: pointer;
`;
const NewBtn = styled(FavBtn)`
    text-align: left;
    color: #fff;
`;
const WorkoutsInfo = styled.div`
    flex: 2;
    padding: 40px;
    display: flex;
    flex-direction: column;
    padding: 40px;
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
`;
const Wrap = styled.div`
    display: flex;
    justify-content: space-between;
`;
const Span = styled.span`
    font-weight: 700;
    color: var(--color-platinum);
    text-transform: capitalize;
`;

export default AllWorkouts;

