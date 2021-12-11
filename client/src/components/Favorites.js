import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import { Trash } from "react-feather";

import { UserContext  } from "./UserContext";
import Btn from "./Btn";

const Favorites = () => {
    const history = useHistory()

    const {currentUser, reRender, setReRender, userId} = useContext(UserContext);

    const handleToDetails = (id, ev) => {
        ev.stopPropagation()
        history.push(`/exercise-details/${id}`);
    }

    const deleteFromFavorites = (id) => {
        fetch(`/remove-favorite`, {
            method: "DELETE",
            body: JSON.stringify({
                userId: userId, 
                _id: id,
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

    return(
        <Main>
            <Wrapper>
            {
                currentUser?.favorites.length > 0 ? (
                    currentUser?.favorites.map((exercise, index) => {
                        return (
                            <Div key={index}>
                                <Img src={exercise.gifUrl}/>
                                <Head>{exercise.name}</Head>
                                <Buttons>
                                    <Btn onClick={(ev) => handleToDetails(exercise._id, ev)}>View</Btn>
                                    <Button onClick={(ev) => {deleteFromFavorites(exercise._id)}}>
                                        <Trash/>
                                    </Button>
                                </Buttons>
                            </Div>
                        )
                    })
                ) : (
                        <Par>You didn't add any exercises yet</Par>
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
    flex-wrap: wrap;
    min-height: 75vh;
    width: 1200px;
    border-radius: 10px;
    margin: 30px;
    margin-right: 0 auto;
    box-shadow: -2px 2px 10px 5px #cacaca;
    background: rgba(71, 72, 71, 0.7);
`;
const Div = styled.div`
    width: 350px;
    background: rgba(234, 235, 234, 0.7);
    margin: 20px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    &:hover{
        box-shadow: 0 0 10px var(--color-eerie-black), 0 0 20px var(--color-eerie-black), 0 0 30px var(--color-eerie-black);
    }
`;
const Button = styled.button`
    padding: 10px;
    font-size: 24px;
    color: var(--color-red-crayola);
    font-weight: 700;
    text-align: center;
    background: transparent;
    border: none;
    cursor: pointer;
    &:hover{
        color: var(--color-davys-grey);
    }
`;
const Img = styled.img`
    width: 90%;
    margin: 10px;
`;
const Head = styled.h3`
    font-size: 22px;
    text-align: center;
    text-transform: uppercase;
    min-height: 60px;
`;
const Par = styled.p`
    font-size: 22px;
    font-weight: 700;
    text-align: center;
    padding: 20px;
    width: 100%;
    color: #fff;
`;
const Buttons = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
`;
export default Favorites;