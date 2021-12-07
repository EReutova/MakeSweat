import React from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import { User } from "react-feather";

import Btn from "./Btn";
import Button from "./Button";
import SearchBar from "./SearchBar"

const NavBar = () => {
    const history = useHistory()

    const handleToSignIn = () => {
        history.push("/login")
    }

    const handleToSignUp = () => {
        history.push("/signup")
    }
    return(
        <Wrapper>
            <SearchBar />
            <Button onClick={handleToSignIn}>
                <User/>
                Log in
            </Button>
            <Btn onClick={handleToSignUp}>Sign up</Btn>
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
    position: fixed;
    top: 0;
	z-index: 200;
`;

export default NavBar;