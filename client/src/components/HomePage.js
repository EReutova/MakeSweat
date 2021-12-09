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
                    {/* <p>Welcome to MakeSweat! I'm gonna help you to built an ideal workout that matches your needs and requirements. Over 1300 exercises </p> */}
                </Wrapper>
            </Main>
                    <Feed />
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
export default HomePage;