import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import styled from "styled-components";

const ExerciseDetails = () => {
    const { id } = useParams();

    //variable to store fetch result
    const [exercise, setExercise] = useState(null);

    useEffect(() => {
        fetch(`/exercise/${id}`)
            .then((res) => res.json())
            .then((data) => setExercise(data.data))
            .catch((err) => {
                console.log("error");
            });
    }, [id]);
    // bodyPart: "waist"
    // equipment: "body weight"
    // gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/0002.gif"
    // id: "0002"
    // name: "45° side bend"
    // target: "abs"
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

                        </Info>
                    </Wrapper>

                )
            }
        </>
    )
}

const Wrapper = styled.div`
    margin: auto;
    margin-top: 100px;
    width: 70%;
    background: rgba(234, 235, 234, 0.7);
    display: flex;
    justify-content: center;
`;
const Img = styled.img`
    padding: 30px;
    flex: 1;
`;
const Info = styled.div`
    flex: 1;
    padding: 30px;
`;
const H3 = styled.h3`
    
`;
export default ExerciseDetails;