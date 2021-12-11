import React, { useState, useContext } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import { Search } from "react-feather";
import { X } from "react-feather";


import { ExercisesContext } from "./ExercisesContext";

const SearchBar = () => {
    const history = useHistory()
    const { setInputValue, inputValue, exercises, setExercises, start, limit } = useContext(ExercisesContext);

    const handleInput = (ev) => {
        setInputValue(ev.target.value);
    }

    const handleSearch = (ev) => {
        ev.preventDefault();

        fetch(`/exercises?searchRequest=${inputValue}&start=${start}&limit=${limit}`)
        .then(res => res.json())
        .then(data => {
            setExercises([...data.data]);
            // setInputValue("");
            history.push("/");
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return(
        <Form onSubmit={handleSearch}>
            <Button type="submit"><Search/></Button>
            <Input 
                value={inputValue}
                placeholder="Search" 
                onChange={handleInput}
            />
            <Button onClick={()=> {setInputValue("")}}><X/></Button>
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
export default SearchBar;