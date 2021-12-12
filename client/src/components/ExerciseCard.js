import React, {useContext, useState} from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import { Award } from "react-feather";

import { UserContext } from "./UserContext"

import Btn from "./Btn";

const ExerciseCard = ({exercise}) => {
    const history = useHistory();

    const { currentUser, reRender, setReRender, userId } = useContext(UserContext);

    //variable to hold BE message
    const [message, setMessage] = useState(null);

    //variable to hold errors
    const [error, setError] = useState(null);
    
    const handleToDetails = (id, ev) => {
        ev.stopPropagation()
        history.push(`/exercise-details/${id}`);
    }
    
    // function that saves exercise in user's 'favorites'
    const handleAddToFavorite = (ev) => {
        ev.stopPropagation()
        ev.preventDefault();

        //do fetch only if user is logged in 
        if (userId){
            fetch("/add-favorite", {
                method: "PUT",
                body: JSON.stringify({
                    userId: currentUser._id,  
                    bodyPart: exercise.bodyPart,
                    equipment: exercise.equipment,
                    gifUrl: exercise.gifUrl,
                    _id: exercise._id,
                    name: exercise.name,
                    target: exercise.target,
                    description: exercise.description,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => res.json())
            .then((json) => {
                if (json.status === 201){
                    setMessage(json.message);
                    setError(null);
                    setReRender(!reRender);
                }
                else{
                    setError(json.message);
                    setMessage(null);
                    setReRender(!reRender);
                }
            })
            .catch((err) => {
                console.log(err)
            })    
        }
        
        //if user is not logged in
        else{
            setError("Please login");
            setMessage(null);
            setReRender(!reRender);
        }
    }

    return(
        <>
        {
            exercise && currentUser &&
            <Wrapper onClick={(ev) => handleToDetails(exercise._id, ev)}>
                {/* {
                    currentUser?.favorites.includes(exercise._id) && */}
                    <Button onClick={(ev)=> {handleAddToFavorite(ev)}}><Favorite/></Button>
                {/* } */}
                <Img src={exercise.gifUrl}/>
                <Head>{exercise.name}</Head>
                {
                    message === null && error === null &&
                        <Btn onClick={(ev) => handleToDetails(exercise._id, ev)}>View</Btn>                    
                }
                {
                    message !== null &&
                    <Message>{message}</Message>
                }
                {
                    error !== null &&
                    <Error>{error}</Error>
                }
                
            </Wrapper>
        }
        </>
    )
}

const Wrapper = styled.div`
    position: relative;
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
const Button = styled.button`
    position: absolute;
    border: none;
    background: transparent;
    color: var(--color-red-crayola);
    top: 5px;
    right: 5px;
    width: 50px;
    cursor: pointer;

    &:hover{
        color: var(--color-davys-grey);
    }
`;
const Favorite = styled(Award)`
    width: 50px;
    height: 50px;
`;
const Img = styled.img`
    width: 90%;
    margin: 20px;
`;
const Head = styled.h3`
    width: 100%;
    font-size: 22px;
    text-align: center;
    text-transform: uppercase;
    padding: 10px;
    min-height: 75px;
`;
const Message = styled.p`
    padding: 10px;
    margin: 25px 5px;
    font-size: 22px;
    text-align: center;
    color: #229481;
    border: 2px solid #229481;
    border-radius: 5px;
`;
const Error = styled(Message)`
    color: var(--color-red-crayola);
    border: 2px solid var(--color-red-crayola);
`;

export default ExerciseCard;