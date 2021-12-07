import React, { useState, useContext } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import { ExercisesContext } from "./ExercisesContext";

const SearchBar = () => {
    const history = useHistory()
    const { setInputValue, inputValue } = useContext(ExercisesContext);

    const handleInput = (ev) => {
        setInputValue(ev.target.value);
    }

    return(
        <label>
            <Input placeholder="Search" onChange={handleInput}/>
        </label>
    )
}

const Input = styled.input`
    background: var(--color-silver);
    border: none;
    padding: 10px;
    width: 300px;
    font-size: 18px;
`;
export default SearchBar;