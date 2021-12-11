import React, {useContext, useState} from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import { Heart } from "react-feather";
import { Trash } from "react-feather";

import { UserContext } from "./UserContext";
import Button from "./Button";
import Btn from "./Btn";

const Profile = () => {
    const history = useHistory();

    const { currentUser, reRender, setReRender } = useContext(UserContext);

    //initial state of workout info
    const initialState = {
        type: "",
        name: "",
    }

    //initial state of user's info
    const initialUserState = {
        name: currentUser?.name,
        age: currentUser?.age,
        weight: currentUser?.weight,
        email: currentUser?.email,
        password: currentUser?.password
    }

    //variable that is in charge of displaying the section "add to workout"
    const [display, setDisplay] = useState(false);

    //variable that is in charge of displaying user's info section
    const [displayInfo, setDisplayInfo] = useState(true);

    //variable that holds data from form "Create worcout"
    const [formData, setFormData] = useState(initialState);

    //variable that holds data from "update data" form
    const [userData, setUserData] = useState(initialUserState);

    //variable that holda errors
    const [error, setError] = useState(null);

    //variable to store password for validation
    const [password, setPassword] = useState(null);


    //function that turns received from BE password into "****" \\\\WILL BE UPDATED ONES I FIGURE OUT HASH
    const handlePassword = () => {
        let password = [];
        for (let i = 0; i < currentUser?.password.length; i++){
            password.push("*")
        }
        return password;
    }

    // function that displayes "create workout" when you click on button
    const handleDisplay = () => {
        setDisplay(true);
    }

    // function that displayes "update data" section when you click on button "update data"
    const handleDisplayInfo = () => {
        setDisplayInfo(false)
    }

    //function that updates formData wirh values from inputs
    const updateForm = (value, name) => {      
        setFormData({...formData, [name]: value});
    }

    const updateUserInfo = (value, name) => {
        setUserData({...userData, [name]: value});
    }

    // function that redirects to /favorites
    const toFavorites = () => {
        history.push("/favorites")
    }

    //function that redirects to workout details page
    const handleToWorkoutDetails = (id) => {
        history.push(`/workout/${id}`);
    }

    //function that deletes workout
    const handleToDelete = (element) => {
        fetch(`/workout/${element._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        // .then((res) => JSON.parse(res))
        .then((json) => {
            setReRender(!reRender);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    //function that creates workout
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

            setReRender(!reRender);
        })
        .catch((err) => {
            console.log(err);
        })
        setDisplay(false);
    }

    const validatePassword = (value) => {
        setPassword(value);
    }

    const handleUpdateUsersInfo = (ev) => {
        ev.preventDefault();
        if (password !== currentUser.password){
            setError("Wrong password!");
        }
        else {
            fetch(`/user/${currentUser._id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    name: userData.name,  
                    age: userData.age,
                    weight: userData.weight,
                    email: userData.email,             
                    password: userData.password
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => res.json())
            .then((json) => {
                if (json.status === 200){
                    setError(null);
                    setDisplayInfo(true);
                    setReRender(!reRender)
                }
                else{
                    setReRender(!reRender)
                }
            })
            .catch((err) => {
                console.log(err)
            })    
        }
    }

    return(
        <>
        {
            currentUser &&
                <Main>
                    <Wrapper>
                        {
                            displayInfo === true &&
                                <UserInfo>
                                    <Name>{currentUser.name}</Name>
                                    <Par>Age: {currentUser.age}</Par>
                                    <Par>Weight: {currentUser.weight}kg</Par>
                                    <Par>Email: {currentUser.email}</Par>
                                    <Par>Password: {handlePassword()}</Par>
                                    <FavBtn onClick={toFavorites}><Heart/> Favorites</FavBtn>
                                    <Button onClick={handleDisplayInfo}>Update data</Button>
                                </UserInfo>
                        }
                        {
                            displayInfo === false &&
                                <UserInfo>
                                    <Name>Update information</Name>
                                    <Form onSubmit={handleUpdateUsersInfo}>

                                        <Label>
                                            <Inp 
                                                type="text"
                                                name="name"
                                                placeholder={currentUser.name} 
                                                onChange={(ev)=> updateUserInfo(ev.target.value, ev.target.name)}
                                            />
                                        </Label>

                                        <Label>
                                            <Inp 
                                                type="text"
                                                name="age"
                                                placeholder={`Age: ${currentUser.age}`}
                                                onChange={(ev)=> updateUserInfo(ev.target.value, ev.target.name)}
                                            />
                                        </Label>

                                        <Label>
                                            <Inp 
                                                type="text"
                                                name="weight"
                                                placeholder={`Weight: ${currentUser.weight}kg`}
                                                onChange={(ev)=> updateUserInfo(ev.target.value, ev.target.name)}
                                            />
                                        </Label>

                                        <Label>
                                            <Inp 
                                                type="email"
                                                name="email"
                                                placeholder={currentUser.email} 
                                                onChange={(ev)=> updateUserInfo(ev.target.value, ev.target.name)}
                                            />
                                        </Label>

                                        <Label>
                                            <Inp 
                                                type="password"
                                                name="password"
                                                required
                                                placeholder="Password" 
                                                onChange={(ev)=> validatePassword(ev.target.value)}
                                            />
                                        </Label>
                                        
                                        <Label>
                                            <Inp 
                                                type="password"
                                                name="password"
                                                placeholder="New password" 
                                                onChange={(ev)=> updateUserInfo(ev.target.value, ev.target.name)}
                                            />
                                        </Label>

                                        <Button type="submit">save changes</Button>
                                        {
                                            error !== null &&
                                            <Error>{error}</Error>
                                        }
                                    </Form>
                                    
                                </UserInfo>
                        }
                        <WorkoutsInfo>
                            <Name>Workouts</Name>
                            {
                                currentUser?.workouts.length > 0 &&
                                currentUser?.workouts.map((workout, index)=> {
                                    return(
                                        <Container key={index}>
                                            <Wrap>
                                                <NewBtn 
                                                    onClick={()=> {handleToWorkoutDetails(workout._id)}}
                                                >
                                                <Span>{workout.name}:</Span> {workout.type}</NewBtn>
                                                <FavBtn onClick={() => {handleToDelete(workout)}}><Trash/></FavBtn>
                                            </Wrap>
                                        </Container>
                                    )
                                })
                            }
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
    width: 400px;
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
const FavBtn = styled.button`
    padding: 10px;
    font-size: 24px;
    color: var(--color-red-crayola);
    font-weight: 700;
    text-align: center;
    background: transparent;
    border: none;
    cursor: pointer;
`;
const NewBtn = styled(FavBtn)`
    text-align: left;
    color: #fff;
`;
const WorkoutsInfo = styled.div`
    flex: 2;
    padding: 40px;
    display: flex;
    flex-direction: column;
    padding: 40px;
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
`;
const Wrap = styled.div`
    display: flex;
    justify-content: space-between;
`;
const Span = styled.span`
    font-weight: 700;
    color: var(--color-platinum);
    text-transform: capitalize;
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
const Inp = styled(Input)`
    width: 350px;
`;
const Error = styled.p`
    padding: 10px;
    margin: 20px 0;
    font-size: 26px;
    text-align: center;
    color: var(--color-red-crayola);
    border: 2px solid var(--color-red-crayola);
    border-radius: 5px;
`;
export default Profile;