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
            <Input 
                value={inputValue}
                placeholder="Search" 
                onChange={handleInput}
            />
        </label>
    )
}

const Input = styled.input`
    background: var(--color-platinum);
    font-weight: 700;
    border: none;
    padding: 10px;
    width: 300px;
    font-size: 18px;
`;
export default SearchBar;