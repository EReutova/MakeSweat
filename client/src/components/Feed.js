import React, {useContext} from "react";
import styled from "styled-components";

import { ExercisesContext } from "./ExercisesContext";
import ExerciseCard from "./ExerciseCard"
import Button from "./Button";

const Feed = () => {
    const { exercises, start, setStart, limit } = useContext(ExercisesContext);

    const handleStartLimit = () => {
        setStart(start + limit);
    }

    return(
        <Wrapper>
            <Div>
                {
                    exercises.length !== 0 && 
                    exercises.map((exercise, index)=> {
                        return (
                                <div key={index}>
                                    <ExerciseCard exercise={exercise}/>
                                </div>
                            )
                    })
                }
            </Div>
            <Button onClick={handleStartLimit}>More</Button>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Div = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;
export default Feed;