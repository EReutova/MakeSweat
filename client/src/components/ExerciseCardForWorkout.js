import React, {useState, useContext} from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import { Trash } from "react-feather";
import { Check } from "react-feather";
import { Edit } from "react-feather";
import { X } from "react-feather";


import { UserContext } from "./UserContext";
import Btn from "./Btn";


const ExerciseCardForWorkout = ({chosenWorkout, exercise, id}) => {

    const history = useHistory();

    const { currentUser, reRender, setReRender } = useContext(UserContext);

    //variable that holds value of description when it's being added
    const [description, setDescripton] = useState("");

    //variable for conditional rendering "Add your description" button
    const [showBtn, setShowBtn] = useState(true);

    //variable for conditional rendering "Add your description" button
    const [showDescription, setShowDescription] = useState(true);

    const handleDeleteFromWorkout = (ev, exerciseId) => {
        ev.preventDefault();
        fetch(`/remove-from-workout`, {
            method: "DELETE",
            body: JSON.stringify({
                userId: currentUser._id, 
                workoutId: chosenWorkout._id, 
                exerciseId: exerciseId
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        // .then((res) => res.json())
        .then((json) => {
            setReRender(!reRender);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleShowBtn = (ev) => {
        ev.preventDefault();
        setShowBtn(false);
        setShowDescription(false);
    }

    const handleInput = (ev) => {
        setDescripton(ev.target.value);
    }

    const handleCancel = () => {
        setDescripton("");
        setShowBtn(true);
        setReRender(!reRender);
        if (exercise.description){
            setShowDescription(true);
        }
    }
    
    const handleUpdateWorkout = (ev) => {
        ev.preventDefault();

        fetch(`/workout/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                userId: currentUser._id,
                exerciseId: exercise.exerciseId,             
                description: description,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((json) => {
            if (json.status === 200){
                setShowBtn(true);
                setShowDescription(true);
                setDescripton("");
                setReRender(!reRender);
            }
            else{
                setReRender(!reRender)
            }
        })
        .catch((err) => {
            console.log(err)
        })    
        
    }

    const handleToDetails = (id) => {
        history.push(`/exercise-details/${id}`);
    }

    return(
            <Wrapper>
                <Img src={exercise.gifUrl}/>
                <Head>{exercise.name}</Head>
                {
                    exercise.description && showDescription === true ? (
                        <Div>
                            <Par>{exercise.description}</Par>
                            <Button onClick={(ev)=>{handleShowBtn(ev)}}><Edit /></Button>
                        </Div>
                    ) : (
                        showBtn === true &&
                        <Button onClick={(ev)=>{handleShowBtn(ev)}}>Add your description</Button>
                    )
                }
                {
                    showBtn === false &&
                        <Form onSubmit={handleUpdateWorkout}>
                            <Input 
                                placeholder="add description" 
                                onChange={handleInput}
                            />
                            <Submit type="submit"><Check/></Submit>
                            <Button onClick={handleCancel}><X/></Button>
                        </Form>
                }
                <Buttons>
                    <Btn onClick={() => handleToDetails(exercise.exerciseId)}>View</Btn>
                    <Button onClick={(ev)=> {handleDeleteFromWorkout(ev, exercise.exerciseId)}}>
                        <Trash/>
                    </Button>
                </Buttons>
            </Wrapper>
    )
}

const Wrapper = styled.div`
    position: relative;
    width: 350px;
    background: rgba(234, 235, 234, 0.7);
    margin: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:hover{
        box-shadow: 0 0 10px var(--color-eerie-black), 0 0 20px var(--color-eerie-black), 0 0 30px var(--color-eerie-black);
    }
`;
const Div = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
`;
const Img = styled.img`
    width: 90%;
    margin: 20px;
`;
const Head = styled.h3`
    padding: 10px;
    font-size: 18px;
    text-align: center;
    text-transform: uppercase;
    min-height: 60px;
`;
const Buttons = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
`;
const Form = styled.form`
    display:flex;
    flex-direction:row;
    padding:2px;
    background: var(--color-platinum);
    border-radius: 5px;
    width: 100%;
    margin: 5px;
`;
const Input = styled.input`
    background: var(--color-platinum);
    font-weight: 700;
    border: none;
    padding: 10px;
    width: 300px;
    font-size: 18px;

    &:focus{
        outline: none;
    }
`;
const Button = styled.button`
    padding: 10px;
    font-size: 24px;
    color: var(--color-red-crayola);
    font-weight: 500;
    text-align: center;
    background: transparent;
    border: none;
    cursor: pointer;
    &:hover{
        color: var(--color-davys-grey);
    }
`;
const Submit = styled(Button)`
    color: #2fd9bc;
`;
const Par = styled.p`
    padding: 10px;
    text-align: center;
    font-size: 22px;
    color: #fff;
`;

export default ExerciseCardForWorkout;