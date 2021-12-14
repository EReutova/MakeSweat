import React, { useContext } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import { Search } from "react-feather";
import { X } from "react-feather";
import { HiOutlineAdjustments } from 'react-icons/hi';

import { ExercisesContext } from "./ExercisesContext";
import { UserContext } from "./UserContext";

const SearchBar = ({ setDisplayFilter }) => {
    const history = useHistory();
    const { userId } = useContext(UserContext);

    const { setInputValue, inputValue, setExercises, start, setStart, limit } = useContext(ExercisesContext);

    const handleInput = (ev) => {
        setInputValue(ev.target.value);
    }

    const handleShowFilter = (ev) => {
        if (userId){
            setDisplayFilter(true);
        }
        else{
            history.push("/login");
        }
    }

    const handleClear = () => {
        setInputValue("");
        setStart(0);
    }

    const handleSearch = (ev) => {
        ev.preventDefault();

        if(userId) {
            fetch(`/exercises?searchRequest=${inputValue}&start=${start}&limit=${limit}`)
            .then(res => res.json())
            .then(data => {
                setExercises([...data.data]);
                // setInputValue("");
                history.push("/feed");
            })
            .catch((err) => {
                console.log(err);
            });
        }

        else{
            history.push("/login");
        }
    }

    return(
        <Form onSubmit={handleSearch}>
            <Button type="submit"><Search/></Button>
            <Input 
                value={inputValue}
                placeholder="Search" 
                onChange={handleInput}
            />
            <Btn onClick={(ev)=> handleShowFilter(ev)}><HiOutlineAdjustments/></Btn>
            <Button onClick={handleClear}><X/></Button>
        </Form>
    )
}

const Form = styled.form`
    display:flex;
    flex-direction:row;
    padding:2px;
    background: var(--color-platinum);
    border-radius: 5px;
`;
const Input = styled.input`
    background: var(--color-platinum);
    font-weight: 700;
    border: none;
    padding: 10px;
    width: 300px;
    font-size: 18px;

    &:focus{
        outline: none;
    }
`;
const Button = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--color-davys-grey);
`;
const Btn = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--color-davys-grey);
    font-size: 22px;
    transform: rotate(90deg);
`;
export default SearchBar;