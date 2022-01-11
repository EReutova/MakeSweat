import React, { useContext } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import { ExercisesContext } from "./ExercisesContext";

const FilteringBar = ({displayFilter, setDisplayFilter}) => {
    
    const history = useHistory();

    const { 
        inputValue, 
        setExercises, 
        start, limit, 
        filteredSearch, setFilteredSearch,
        initialState
    } = useContext(ExercisesContext);

    //function that updates searchData wirh values from dropdowns
    const updateSearchData = (value, name) => {      
        setFilteredSearch({...filteredSearch, [name]: value});
    }
    
    const handleCancel = (ev) => {
        ev.preventDefault();
        setDisplayFilter(false);
    }
    const handleComplexSearch = (ev) => {
        ev.preventDefault();
        fetch(`/exercises?searchRequest=${inputValue}&equipment=${filteredSearch.equipment}&target=${filteredSearch.target}&bodyPart=${filteredSearch.bodyPart}&start=${start}&limit=${limit}`)
        .then(res => res.json())
        .then(data => {
            setExercises([...data.data]);
            setDisplayFilter(false);
            setFilteredSearch(initialState);
            history.push("/feed");
        })
        .catch((err) => {
            console.log(err);
        });
    }


    return(
        <Wrapper>
            <Form onSubmit={handleComplexSearch}>
                <Label>
                    <Select 
                        name="equipment"
                        onChange={(ev)=> updateSearchData(ev.target.value, ev.target.name)} 
                        defaultValue="Select equipment"
                    >
                        <option>Select equipment</option>
                        <option>assisted</option>
                        <option>band</option>
                        <option>barbell</option>
                        <option>body weight</option>
                        <option>bosu ball</option>
                        <option>cable</option>
                        <option>dumbbell</option>
                        <option>elliptical machine</option>
                        <option>ez barbell</option>
                        <option>hammer</option>
                        <option>kettlebell</option>
                        <option>leverage machine</option>
                        <option>medicine ball</option>
                        <option>olympic barbell</option>
                        <option>resistance band</option>
                        <option>roller</option>
                        <option>rope</option>
                        <option>skierg machine</option>
                        <option>sled machine</option>
                        <option>smith machine</option>
                        <option>stability ball</option>
                        <option>stationary bike</option>
                        <option>stepmill machine</option>
                        <option>tire</option>
                        <option>trap bar</option>
                        <option>upper body ergometer</option>
                        <option>weighted</option>
                        <option>wheel roller</option>
                    </Select>
                </Label>
                <Label>
                    <Select 
                        name="target"
                        onChange={(ev)=> updateSearchData(ev.target.value, ev.target.name)} 
                        defaultValue="Select target"
                    >
                        <option>Select target</option>
                        <option>abductors</option>
                        <option>abs</option>
                        <option>adductors</option>
                        <option>biceps</option>
                        <option>calves</option>
                        <option>cardiovascular system</option>
                        <option>delts</option>
                        <option>forearms</option>
                        <option>glutes</option>
                        <option>hamstrings</option>
                        <option>lats</option>
                        <option>levator scapulae</option>
                        <option>pectorals</option>
                        <option>quads</option>
                        <option>serratus anterior</option>
                        <option>spine</option>
                        <option>traps</option>
                        <option>triceps</option>
                        <option>upper back</option>
                    </Select>
                </Label>
                <Label>
                    <Select  
                        name="bodyPart"
                        onChange={(ev)=> updateSearchData(ev.target.value, ev.target.name)} 
                        defaultValue="Select body part"
                    >
                        <option>Select body part</option>
                        <option>back</option>
                        <option>cardio</option>
                        <option>chest</option>
                        <option>lower arms</option>
                        <option>lower legs</option>
                        <option>neck</option>
                        <option>shoulders</option>
                        <option>upper arms</option>
                        <option>upper legs</option>
                        <option>waist</option>
                    </Select>
                </Label>
                <Buttons>
                    <Button type="submit">search</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </Buttons>
            </Form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background: var(--color-davys-grey);
    height: 90px;
    width: 100%;
`;
const Form = styled.form`
    height: 90px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;
const Label = styled.label`
    margin: 5px;
    font-size: 20px;
`;
const Select = styled.select`
    width: 300px;
    border: none;
    padding: 10px;
    border-radius: 5px;
    margin: 10px;
`;
const Button = styled.button`
    margin: 5px 20px;
    position: relative;
    display: inline-block;
    padding: 15px 30px;
    background: var(--color-red-crayola);
    color: var(--color-charlestone-green);
    text-transform: uppercase;
    font-weight: 700;
    font-size: 18px;
    overflow: hidden;
    transition: 250ms;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover{
        cursor: pointer;
        box-shadow: 0 0 10px var(--color-red-crayola), 0 0 40px var(--color-red-crayola), 0 0 80px var(--color-red-crayola);
    }

`;
const Buttons = styled.div`
    display: flex;
    margin-left: auto;

`;
export default FilteringBar;