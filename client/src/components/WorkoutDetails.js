import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";

import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

import { Trash } from "react-feather";
import { Plus } from "react-feather";


import { UserContext } from "./UserContext";
import Btn from "./Btn";

const WorkoutDetails = () => {
    const history = useHistory();
    const { id } = useParams();

    const { currentUser, reRender, setReRender } = useContext(UserContext);

    //variable that holds workout details
    const [chosenWorkout, setChosenWorkout] = useState(null);

    //variable that holds value of description when it's being added
    const [description, setDescripton] = useState(null);

    //variable for conditional rendering "Add your description" button
    const [showBtn, setShowBtn] = useState(true);


    useEffect(() => {
        fetch(`/workout/${id}`)
            .then(res => res.json())
            .then(data => {
                setChosenWorkout(data.result)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [reRender]);

    const handleDeleteFromWorkout = (ev, exerciseId) => {
        ev.preventDefault();
        fetch(`/remove-from-workout`, {
            method: "DELETE",
            body: JSON.stringify({
                userId: currentUser._id, 
                workoutId: id, 
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
    }

    const handleInput = (ev) => [
        setDescripton(ev.target.value)
    ]

    const handleUpdateWorkout = (ev, obj) => {
        ev.preventDefault();
        setShowBtn(true);
        setDescripton(null)

        // fetch(`/workout/${id}`, {
        //     method: "PATCH",
        //     body: JSON.stringify({
        //         userId: currentUser._id,  
        //         exerciseId: obj.exerciseId,             
        //         description: obj.description,
        //     }),
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // })
        // .then((res) => res.json())
        // .then((json) => {
        //     if (json.status === 200){
            //setShowBtn(true);
            //setDescripton(null)
        //         setReRender(!reRender)
        //     }
        //     else{
        //         setReRender(!reRender)
        //     }
        // })
        // .catch((err) => {
        //     console.log(err)
        // })    
        
    }


    const handleToDetails = (id) => {
        history.push(`/exercise-details/${id}`);
    }

    return(
        <Main>
            <Wrapper>
                {
                    chosenWorkout ? (
                        <>
                            <Name>{chosenWorkout.name}</Name>
                            <Par>Type: {chosenWorkout.type}</Par>
                            {
                                chosenWorkout?.exercises.length === 0 && 
                                <Parr>You didn't add any exercises yet</Parr>
                            }
                            <Divv>
                                {   
                                    chosenWorkout?.exercises.map((exercise, index)=> {
                                        return (
                                            <Div key={index}>
                                                <Img src={exercise.gifUrl}/>
                                                <Head>{exercise.name}</Head>
                                                {
                                                    exercise.description !== null ? (
                                                        <Parr>{exercise.description}</Parr>
                                                    ) : (
                                                        showBtn === true &&
                                                        <Button onClick={(ev)=>{handleShowBtn(ev)}}>Add your description</Button>
                                                    )
                                                }
                                                {
                                                    showBtn === false &&
                                                        <Form onSubmit={()=>{handleUpdateWorkout(exercise)}}>
                                                            <Input 
                                                                value={description}
                                                                placeholder="add description" 
                                                                onChange={handleInput}
                                                            />
                                                            <Button type="submit"><Plus/></Button>
                                                        </Form>
                                                }
                                                <Buttons>
                                                    <Btn onClick={(ev) => handleToDetails(exercise.exerciseId)}>View</Btn>
                                                    <Button onClick={(ev)=> {handleDeleteFromWorkout(ev, exercise.exerciseId)}}>
                                                        <Trash/>
                                                    </Button>
                                                </Buttons>
                                            </Div>
                                        )
                                    })
                                }
                            </Divv>
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
const Parr = styled.p`
    padding: 10px;
    text-align: center;
    font-size: 22px;
    color: #fff;
`;
const Divv = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;
const Div = styled.div`
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

export default WorkoutDetails;