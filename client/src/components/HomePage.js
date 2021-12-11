import React, {useContext} from "react";
import styled from "styled-components";

import Title from "../assets/title.jpeg";
import RandomQuote from "./RandomQuote";
import Feed from "./Feed";


const HomePage = () => {

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
{/* 1.
View Available Workouts
2.
Get started Start a Workout
3.
Browse exercises */}
                    </Div>
                </Wrapper>
            </Main>
            {/* <Feed /> */}
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
    color: #fff;
`;
const Head = styled.h3`
    font-size: 30px;
    text-align: center;
    color: var(--color-red-crayola);
    margin: 10px;
`;
const Par = styled.p`
    font-size: 24px;
    margin: 5px;
`;
export default HomePage;