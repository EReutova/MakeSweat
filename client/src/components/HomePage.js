import React, { useContext, useState } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import Title from "../assets/title.jpeg";
import RandomQuote from "./RandomQuote";
import { UserContext } from "./UserContext";


const HomePage = () => {
    const history = useHistory();

    const { userId } = useContext(UserContext);

    //variable to hold errors
    const [error, setError] = useState(null);

    const toLogIn = () => {
        if (userId){
            history.push("/profile")
        }
        else{
            history.push("/login");
        }
    }
    const toFeed = () => {
        if (userId){
            history.push("/feed");
        }
        else{
            setError("Please login");
        }
    }
    const toWorkouts = () => {
        if (userId){
            history.push("/workouts");
        }
        else{
            setError("Please login");
        }
    }
    return(
        <>
            {/* <RandomQuote/> */}
            <Main>
                <Wrapper>
                    <Img src={Title}/>
                    <Div>
                        <Head>Welcome to MakeSweat!</Head> 
                        <Par>I'm an app that will help you to built your perfect body!</Par>
                        <Par>Access the library of over 1300+ exercises!</Par>
                        <Par>Design any workout you can dream!</Par>
                        <Par>Or simply choose one of our ready to use workouts!</Par>

                        <AnotherDiv>
                            <Button onClick={toLogIn}>Get Started</Button>
                            <Button onClick={toFeed}>Browse Exercises</Button>
                            <Button onClick={toWorkouts}>View Workouts</Button>
                        {
                            error !== null &&
                            <Error>{error}</Error>
                        }
                        </AnotherDiv>
        
                    </Div>
                </Wrapper>
            </Main>
        </>
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
const Img = styled.img`
    width: 50%;
    padding: 20px;
`;
const Div = styled.div`
    width: 45%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    color: var(--color-platinum);
`;
const Head = styled.h3`
    font-size: 30px;
    font-weight: 700;
    text-align: center;
    color: #fff;
    margin: 10px;
`;
const Par = styled.p`
    font-size: 20px;
    margin: 10px;
`;
const AnotherDiv = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`;
const Button = styled.button`
    position: absolute;
    background: var(--color-red-crayola);
    color: var(--color-charlestone-green);
    border: none;
    height: 60px;
    padding: 20px;
    margin: 10px;
    text-transform: uppercase;
    font-size: 20px;
    font-weight: 700;
    text-align: left;
    width: 370px;
    right: 0;
    transition: ease-in-out 700ms;
    &:nth-child(2){
        top: 75px;
    }
    &:nth-child(3){
        top: 150px;
    }
    &:hover{
        cursor: pointer;
        width: 480px;
        box-shadow: 0 0 10px var(--color-red-crayola), 0 0 40px var(--color-red-crayola), 0 0 80px var(--color-red-crayola);
    }
    &:focus{
        transition: ease-in-out 700ms;
        width: 500px;
        box-shadow: 0 0 10px var(--color-red-crayola), 0 0 40px var(--color-red-crayola), 0 0 80px var(--color-red-crayola);
    }
`;
const Error = styled.p`
    position: absolute;
    top: 220px;
    padding: 10px;
    margin: 20px 0;
    width: 500px;
    font-size: 26px;
    text-align: center;
    color: var(--color-red-crayola);
    border: 2px solid var(--color-red-crayola);
    border-radius: 5px;
`;
export default HomePage;