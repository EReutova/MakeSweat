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
        <>
            <Wrapper>
                {
                    exercises.length !== 0 && 

                    exercises.map((exercise)=> {
                        return <ExerciseCard exercise={exercise}/>
                    })
                }
            </Wrapper>
            <Button onClick={handleStartLimit}>More</Button>
            </>
    )
}
const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;
export default Feed;