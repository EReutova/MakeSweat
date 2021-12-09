import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import { UserContext  } from "./UserContext";
import Btn from "./Btn";

const Favorites = () => {
    const history = useHistory()

    const {currentUser} = useContext(UserContext);
    console.log(currentUser.favorites)

    const handleToDetails = (id, ev) => {
        ev.stopPropagation()
        history.push(`/exercise-details/${id}`);
    }

    return(
        <Main>
            <Wrapper>
            {
                currentUser ? (
                    currentUser?.favorites.map((exercise) => {
                        <Div onClick={(ev) => handleToDetails(exercise.id, ev)}>
                            <Img src={exercise.gifUrl}/>
                            <Head>{exercise.name}</Head>
                            <Btn onClick={(ev) => handleToDetails(exercise.id, ev)}>View</Btn>
                        </Div>
                    })
                ) : (
                        <p>loading</p>
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
    min-height: 75vh;
    width: 1200px;
    border-radius: 10px;
    margin: 30px;
    margin-right: 0 auto;
    box-shadow: -2px 2px 10px 5px #cacaca;
    background: rgba(71, 72, 71, 0.7);
    /* overflow-y: scroll; */
`;
const Div = styled.div`
    width: 200px;
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
const Img = styled.img`
    width: 90%;
    margin: 20px;
`;
const Head = styled.h3`
    font-size: 22px;
    text-align: center;
    text-transform: uppercase;
`;
export default Favorites;