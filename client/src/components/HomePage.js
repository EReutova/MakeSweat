import React, {useContext} from "react";
import styled from "styled-components";

import RandomQuote from "./RandomQuote";
import Feed from "./Feed";


const HomePage = () => {

    return(
        <Wrapper>
            <RandomQuote/>
            <Feed />

        </Wrapper>
    )
}
const Wrapper = styled.div`
    margin-top: 0;
`;
export default HomePage;