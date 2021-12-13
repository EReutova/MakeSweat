import React, { useContext } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import { Search } from "react-feather";
import { X } from "react-feather";
import { HiOutlineAdjustments } from 'react-icons/hi';

import { ExercisesContext } from "./ExercisesContext";

const SearchBar = ({ setDisplayFilter }) => {
    const history = useHistory()
    const { setInputValue, inputValue, setExercises, start, limit } = useContext(ExercisesContext);

    const handleInput = (ev) => {
        setInputValue(ev.target.value);
    }

    const handleShowFilter = (ev) => {
        setDisplayFilter(true);
    }

    const handleSearch = (ev) => {
        ev.preventDefault();

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

    return(
        <Form onSubmit={handleSearch}>
            <Button type="submit"><Search/></Button>
            <Input 
                value={inputValue}
                placeholder="Search" 
                onChange={handleInput}
            />
            <Btn onClick={(ev)=> handleShowFilter(ev)}><HiOutlineAdjustments/></Btn>
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
const Btn = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--color-davys-grey);
    font-size: 22px;
    transform: rotate(90deg);
`;
export default SearchBar;