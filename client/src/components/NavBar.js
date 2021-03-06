import React, {useContext, useState} from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import { User } from "react-feather";

import Logo from "../assets/Logo.png"

import Btn from "./Btn";
import Button from "./Button";
import SearchBar from "./SearchBar";
import { UserContext } from "./UserContext";
import FilteringBar from "./FilteringBar";

const NavBar = () => {
    const history = useHistory();

    const { userId, setUserId } = useContext(UserContext);

    //variable than shows Filtering bar
    const [displayFilter, setDisplayFilter] = useState(false);

    const handleToHomePage = () => {
        history.push("/");
    }

    const handleToSignIn = () => {
        history.push("/login");
    }

    const handleToSignUp = () => {
        history.push("/signup");
    }

    const handleLogOut = () => {
        sessionStorage.removeItem("current-user");
        setUserId(null);
        history.push("/");
    }

    const handleToProfile = () => {
        history.push("/profile");
    }
    
    return(
        <>
            <Wrapper>
                <ImgLogo src={Logo} onClick={handleToHomePage}/>
                <SearchBar setDisplayFilter={setDisplayFilter}/>
                {
                    userId === null ? (
                        <Div>
                            <Button onClick={handleToSignIn}>
                                <User/>
                                Log in
                            </Button>
                            <Btn onClick={handleToSignUp}>Sign up</Btn>
                        </Div>
                    ) : (
                        <Div>
                            <Button onClick={handleToProfile}>
                                <User/>
                                Profile
                            </Button>
                            <Btn onClick={handleLogOut}>Log out</Btn>
                        </Div>
                    )
                }
            </Wrapper>
            {
                displayFilter === true &&
                <FilteringBar displayFilter={displayFilter} setDisplayFilter={setDisplayFilter}/>
            }
        </>
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
const ImgLogo = styled.img`
    height: 80px;
    margin: 10px 20px;
    margin-right: auto;
    cursor: pointer;
`;
const Div = styled.div`
    margin-right: 30px;
    display: flex;
    justify-content: space-between;
`;
export default NavBar;