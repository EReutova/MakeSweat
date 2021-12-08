import React, {useContext, useState} from "react";
import styled from "styled-components";

import { UserContext } from "./UserContext";
import Button from "./Button";
import Btn from "./Btn";

const Profile = () => {

    const { currentUser, reRender, setReRender } = useContext(UserContext);
    console.log(currentUser?.workouts)

    //variable that is in charge of displaying the section for create workout
    const [display, setDisplay] = useState(false)

    const handlePassword = () => {
        let password = [];
        for (let i = 0; i < currentUser?.password.length; i++){
            password.push("*")
        }
        return password;
    }

    const handleDisplay = () => {
        setDisplay(true);
    }
    //initial state of workout info
    const initialState = {
        type: "",
        name: "",
    }

    //variable that holds data from form
    const [formData, setFormData] = useState(initialState);

    //function that updates formData wirh values from inputs
    const updateForm = (value, name) => {      
        setFormData({...formData, [name]: value});
    }

    const createWorkout = (ev) => {
        ev.preventDefault();

        fetch("/create/workout", {
            method: "POST",
            body: JSON.stringify({
                userId: currentUser._id,
                name: formData.name,
                type: formData.type,
                exercises: []
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((json) => {
            console.log(json);
            setReRender(!reRender);
        })
        .catch((err) => {
            console.log(err, "error");
        })
        setDisplay(false);
    }

    return(
        <>
        {
            currentUser &&
                <Main>
                    <Wrapper>
                        <UserInfo>
                            <Name>{currentUser.name}</Name>
                            <Par>Age: {currentUser.age}</Par>
                            <Par>Weight: {currentUser.weight}</Par>
                            <Par>Email: {currentUser.email}</Par>
                            <Par>Password: {handlePassword()}</Par>
                            <Button>Change data</Button>
                        </UserInfo>
                        <WorkoutsInfo>
                            <Name>Workouts</Name>
                            {/* {
                                currentUser.workouts.length > 0 &&
                                    <><>
                            } */}
                            <Button onClick={handleDisplay}>Create a workout</Button>
                            {
                                display === true &&
                                    <NewWorkout>
                                        <Form onSubmit={createWorkout}>
                                            <Label>
                                                <Select 
                                                    required 
                                                    name="type"
                                                    onChange={(ev)=> updateForm(ev.target.value, ev.target.name)} 
                                                    defaultValue="Select workout type"
                                                >
                                                    <option disabled>Select workout type</option>
                                                    <option>Single exercises</option>
                                                    <option>Superset</option>
                                                    <option>Tabata</option>
                                                </Select>
                                            </Label>
                                            <Label>
                                                <Input 
                                                    type="text" 
                                                    required 
                                                    name="name"
                                                    placeholder="Workout name" 
                                                    onChange={(ev)=> updateForm(ev.target.value, ev.target.name)}
                                                />
                                            </Label>
                                            <Btn type="submit">save changes</Btn>
                                        </Form>
                                    </NewWorkout>
                                }
                        </WorkoutsInfo>
                    </Wrapper>
                </Main>
        }
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
const UserInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 40px;
    border-right: 2px solid var(--color-charlestone-green);
    position: relative;
`;
const Name = styled.h3`
    font-size: 30px;
    padding: 10px;
    text-align: center;
    color: var(--color-red-crayola);
    border-bottom: 2px solid var(--color-charlestone-green);
`;
const Par = styled.p`
    padding: 10px;
    font-size: 24px;
    color: #fff;
`;
const WorkoutsInfo = styled.div`
    flex: 2;
    padding: 40px;
    display: flex;
    flex-direction: column;
    padding: 40px;
`;
const NewWorkout = styled.div`
    display: flex;
    flex-direction: column;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Label = styled.label`
    margin: 5px;
`;
const Select = styled.select`
    border: none;
    padding: 10px;
    border-radius: 5px;
    width: 500px;
`;
const Input = styled.input`
    border: none;
    padding: 10px;
    border-radius: 5px;
    width: 500px;
`;
export default Profile;