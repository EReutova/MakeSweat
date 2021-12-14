import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";

import styled from "styled-components";

import { UserContext } from "./UserContext";
import Button from "./Button";
import Btn from "./Btn";

const ExerciseDetails = () => {
    const { _id } = useParams();

    const { userId, currentUser, reRender, setReRender } = useContext(UserContext);
    //variable to store fetch result
    const [exercise, setExercise] = useState(null);

    //variable to store text area input
    const [description, setDescripton] = useState(null);

    //variable to hold BE message
    const [message, setMessage] = useState(null);

    //variable to hold errors
    const [error, setError] = useState(null);

    //variable to display list of user's workouts for "Add to workout"
    const [displaySelectWorkout, setDisplaySelectWorkout] = useState(false);

    //variable to hold workout id that is being selected for "Add To Workout"
    const [workoutId, setWorkoutId] = useState(null)

    //fetch for exercise id
    useEffect(() => {
        fetch(`/exercise/${_id}`)
        .then((res) => res.json())
        .then((data) => setExercise(data.result))
        .catch((err) => {
            console.log(err);
        });
    }, [_id]);
    
    //function that sets text area value(as 'description')
    const handleTextAreaInput = (ev) => {
        setDescripton(ev.target.value);
    }

    // Once you click on "Add to workout" it does few things:
    //1. Sets 'message' and 'error' to null(in case they were displayed). 
    // This will hide them, because they are being displayed only if value !== null
    //2. Sets "displaySelectWorkout" to "true" to render options
    const handleSelectWorkout = (ev) => {
        ev.preventDefault();
        if (currentUser.workouts.length > 0){
            setMessage(null);
            setError(null);
            setDisplaySelectWorkout(true);
        }
        else{
            setError("Please create workout first!")
        }
    }

    // function that saves current exercise in the selected workout
    const addToWorkout = (ev) => {
        ev.preventDefault();
        //do fetch only if user is logged in  
        if (userId) {
            fetch("/add-to-workout", {
                method: "PUT",
                body: JSON.stringify({
                    //gjhgkjygkuygKUHG'JKHB'KHG IMPORTANT CURRENTUSER._id
                    userId: userId,
                    workoutId: workoutId, 
                    exerciseId: exercise._id, 
                    bodyPart: exercise.bodyPart,
                    equipment: exercise.equipment,
                    name: exercise.name,
                    target: exercise.target,
                    gifUrl: exercise.gifUrl,
                    description: description
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => res.json())
            .then((json) => {
                if (json.status === 201){
                    setDisplaySelectWorkout(false);
                    setMessage(json.message);
                }
                else{
                    setDisplaySelectWorkout(false);
                    setError(json.message);
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }

        //if user doesn't have any workouts
        else if(workoutId === null){
            setError("Please create a workout!")
        }

        //if user is not logged in
        else{
            setError("Please login!")
        }
    }

    // function that saves exercise in user's 'favorites'
    const handleAddToFavorite = (ev) => {
        ev.preventDefault();

        //do fetch only if user is logged in 
        if (userId){
            fetch("/add-favorite", {
                method: "PUT",
                body: JSON.stringify({
                    userId: userId,  
                    bodyPart: exercise.bodyPart,
                    equipment: exercise.equipment,
                    gifUrl: exercise.gifUrl,
                    _id: exercise._id,
                    name: exercise.name,
                    target: exercise.target,
                    description: description,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => res.json())
            .then((json) => {
                if (json.status === 201){
                    setMessage(json.message);
                    setReRender(!reRender)
                }
                else{
                    setMessage(null);
                    setError(json.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })    
        }
        
        //if user is not logged in
        else{
            setError("Please login")
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

                            {/* displaying this piece by default when component mounts */}
                            {
                                displaySelectWorkout === false &&
                                    <>
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
                                                rows={4}
                                            />
                                        </Divv>
                                    </>
                            }

                            {/* for Message of success from BE rendering */}
                            {
                                message !==null &&
                                <Message>{message}</Message>
                            }
                            
                            {/* for Error  from BE rendering */}
                            {
                                error !==null &&
                                <Error>{error}</Error>
                            }


                            {/* displaying this piece of code only when adding exercise to workouts*/}
                            {
                                displaySelectWorkout === true && currentUser && currentUser.workouts.length > 0 &&
                                <Form onSubmit={addToWorkout}>
                                    <Label>
                                        <Select 
                                            required 
                                            onChange={(ev)=> setWorkoutId(ev.target.value)} 
                                            defaultValue="Select workout"
                                            >
                                            <option disabled>Select workout</option>
                                            {
                                                currentUser.workouts.map((workout, index) => {
                                                    return (
                                                        <React.Fragment key={index}>
                                                            <option value={workout._id}>{workout.name}</option>
                                                        </React.Fragment>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </Label>
                                    <Btn type="submit">add</Btn>
                                </Form>
                            }

                            <Div>
                                <Button onClick={(ev)=>handleAddToFavorite(ev)}>Add to favorites</Button>
                                <Btn onClick={(ev)=>handleSelectWorkout(ev)}>Add to workout</Btn>
                            </Div>
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
    border-radius: 10px;
    box-shadow: -2px 2px 10px 5px #cacaca;
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
    height: 100%;
    position: relative;
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
    font-family: 'Raleway', sans-serif;
`;
const Message = styled.p`
    padding: 10px;
    margin: 20px 0;
    font-size: 26px;
    text-align: center;
    color: #2fd9bc;
    border: 2px solid #2fd9bc;
    border-radius: 5px;
`;
const Error = styled(Message)`
    color: var(--color-red-crayola);
    border: 2px solid var(--color-red-crayola);
`;
const Div = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 10px;
    right: 20px;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin: 20px;
`;
const Label = styled.label`
    margin: 5px;
`;
const Select = styled.select`
    padding: 10px;
    border: none;
    border-radius: 5px;
    width: 500px;
`;
export default ExerciseDetails;