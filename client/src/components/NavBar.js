import React from "react";
import styled from "styled-components";

import Button from "./Button";
import SearchBar from "./SearchBar"

const NavBar = () => {
    return(
        <Wrapper>
            <SearchBar />
            <Button>Sign up</Button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100px;
    width: 100%;
    background: var(--color-charlestone-green);
`;
export default NavBar;