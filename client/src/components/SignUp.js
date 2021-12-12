import React, { useState, useContext } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import Button from "./Button";
import { UserContext } from "./UserContext";
// import { calculateAge } from "./CalculateAge";

const SignUp = () => {
    const { setUserId, reRender, setReRender} = useContext(UserContext);

    const history = useHistory()

    //initial state of user's info
    const initialState = {
        name: "",
        age: "",
        gender: "",
        weight: "",
        email: "",
        password: "",
        confirmation: "",
    }

    //variable that holds data from form
    const [formData, setFormData] = useState(initialState);

    //variable to hold errors
    const [error, setError] = useState(null);

    const updateForm = (value, name) => {      
        setFormData({...formData, [name]: value});
    }

    const createUser = (ev) => {
        ev.preventDefault()
        //obj is used to send data to BE

        fetch("/create/user", {
            method: "POST",
            body: JSON.stringify({
                name: formData.name,
                age: formData.age,
                gender: formData.gender,
                weight: formData.weight,
                email: formData.email.toLowerCase(),
                password: formData.password,
                confirmation: formData.confirmation,
                workouts: [],
                favorites: [],
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((json) => {
            if (json.status === 201){
                //setting up id of user that is being created in local storage
                sessionStorage.setItem("current-user", JSON.stringify(json._id));
                setUserId(json._id);
                setReRender(!reRender);
                history.push("/");
                setError(null);
            }
            else{
                setError(json.message)
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return(
        <Main>
            <Wrapper>
                <Header>Enter your information</Header>
                <Form onSubmit={createUser}>
                    <Label>
                        <Input 
                            type="text" 
                            name="name"
                            placeholder="Full Name"
                            onChange={(ev)=> updateForm(ev.target.value, ev.target.name)}
                        /><Div><Span>*</Span></Div>
                    </Label>

                    <Label>
                        <Input 
                            type="text" 
                            name="age"
                            placeholder="Your age" 
                            onChange={(ev)=> updateForm(ev.target.value, ev.target.name)}
                        /><Div><Span>*</Span></Div>
                    </Label>
                    
                    <Label>
                        <Select 
                            name="gender"
                            onChange={(ev)=> updateForm(ev.target.value, ev.target.name)} 
                            defaultValue="Select gender"
                        >
                            <option disabled>Select gender</option>
                            <option>Male</option>
                            <option>Female</option>
                        </Select><Div><Span>*</Span></Div>
                    </Label>
                    
                    <Label>
                        <Input 
                            type="text" 
                            name="weight"
                            placeholder="Weight in kg" 
                            onChange={(ev)=> updateForm(ev.target.value, ev.target.name)}
                        /><Div><Span>*</Span></Div>
                    </Label>


                    <Label>
                        <Input 
                            type="email" 
                            name="email"
                            placeholder="Email" 
                            onChange={(ev)=> updateForm(ev.target.value, ev.target.name)}
                        /><Div><Span>*</Span></Div>
                    </Label>

                    <Label>
                        <Input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            onChange={(ev)=> updateForm(ev.target.value, ev.target.name)} 
                        /><Div><Span>*</Span></Div>
                    </Label>

                    <Label>
                        <Input 
                            type="password"
                            name="confirmation"  
                            placeholder="Confirm Password" 
                            onChange={(ev)=> updateForm(ev.target.value, ev.target.name)} 
                        /><Div><Span>*</Span></Div>
                    </Label>

                    {
                        error !== null &&
                        <Error>{error}</Error>
                    }
                    <BtnDiv>
                        <Button type="submit">Sign Up</Button>
                    </BtnDiv>
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
    min-height: 80vh;
    width: 900px;
    border-radius: 10px;
    margin: 20px;
    margin-right: 0 auto;
    box-shadow: -2px 2px 10px 5px #cacaca;
    background: rgba(71, 72, 71, 0.7);
`;
const Header = styled.h1`
    margin-top: 20px;
    text-align: center;
    color: #fff;
    padding: 15px;
    font-size: 26px;
    width: 75%;
    border-radius: 5px; 
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin: 20px;
    min-height: 65vh;
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
const Div = styled.div`
    position: relative;
`;
const Span = styled.span`
    color: var(--color-red-crayola);
    position: absolute;
    bottom: 25px;
    margin: 3px;
    left: 500px;
`;
const Select = styled.select`
    padding: 10px;
    border: none;
    border-radius: 5px;
    width: 500px;
`;
const BtnDiv = styled.div`
    margin-top: auto;
    width: 500px;
    display: flex;
    justify-content: center;
`;
const Error = styled.p`
    padding: 10px;
    margin: 20px 0;
    font-size: 26px;
    text-align: center;
    color: var(--color-red-crayola);
    border: 2px solid var(--color-red-crayola);
    border-radius: 5px;
    width: 510px;
`;
export default SignUp;