import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import { UserContext } from "./UserContext";
import Button from "./Button";

const LogIn = () => {

    const history = useHistory();

    const {userId, reRender, setReRender} = useContext(UserContext);

    //variable that sets error after fetch
    const [error, setError] = useState(null)

    //initial state of user's info
    const initialState = {
        email: "",
        password: "",
    }

    //variable that holds data from form
    const [formData, setFormData] = useState(initialState);

    //if there's user that is logged in - push to home page
    useEffect(() => {
        if (userId !== null){
            history.push("/")
        }
    })

    const handleToSignUp = () => {
        history.push("/signup")
    }

    //function that updates data with value from the email and rassword inputs
    const updateForm = (value, name) => {      
        setFormData({...formData, [name]: value});
    }

    const handleLogIn = (ev) => {
        ev.preventDefault();

        fetch("/login", {
            method: "POST",
            body: JSON.stringify({
                userEmail: formData.email.toLowerCase(), 
                userPassword: formData.password
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((json) => {
            setError(json.message)
            if (json.status === 200){
                //setting up id of user in a local storage
                sessionStorage.setItem("current-user", JSON.stringify(json.user._id));
                setReRender(!reRender);
                history.push("/profile");
            }
        })
        .catch((err) => {
            console.log(err)
        })    
    }

    return(
        <Main>
            <Wrapper>
                <Header>Welcome to MakeSweat!</Header>
                <Par>Please login</Par>
                <Form onSubmit={handleLogIn}>

                    <Label>
                        <Input 
                            type="email" 
                            name="email"
                            required 
                            placeholder="Email" 
                            onChange={(ev)=> updateForm(ev.target.value, ev.target.name)}
                        />
                    </Label>

                    <Label>
                        <Input 
                            type="password" 
                            name="password"
                            required 
                            placeholder="Password" 
                            onChange={(ev) => updateForm(ev.target.value, ev.target.name)}
                        />
                    </Label>

                    <Button type="submit">Log in</Button>
                    {/* here will be rendering of error if or email password are incorrect */}
                    {
                        error !== null &&
                            <Error>{error}</Error>
                    
                    }
                    <Par>Don't have account yet? Join us <Btn onClick={handleToSignUp}>here!</Btn></Par>
                </Form>
                
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
    flex-direction: column;
    align-items: center;
    min-height: 75vh;
    width: 900px;
    border-radius: 10px;
    margin: 30px;
    margin-right: 0 auto;
    box-shadow: -2px 2px 10px 5px #cacaca;
    background: rgba(71, 72, 71, 0.7);
`;
const Header = styled.h1`
    margin-top: 20px;
    text-align: center;
    color: var(--color-red-crayola);
    padding: 15px;
    font-size: 30px;
    width: 75%;
    border-radius: 5px; 
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin: 20px;
    height: 50vh;
`;
const Label = styled.label`
    margin: 5px;
`;
const Input = styled.input`
    padding: 10px;
    border: none;
    border-radius: 5px;
    width: 500px;
`;
const Par = styled.p`
    font-size: 26px;
    margin-top: auto;
    color: #fff;
`;
const Btn = styled.button`
    cursor: pointer;
    font-size: 26px;
    border: none;
    background: transparent;
    color: var(--color-red-crayola);
`;
const Error = styled.p`
    padding: 20px;
    margin: 5px;
    border: 2px solid var(--color-red-crayola);
    border-radius: 5px;
    font-size: 26px;
    text-align: center;
    color: var(--color-red-crayola);
`;
export default LogIn;