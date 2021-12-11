import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import GlobalStyles from "./GlobalStyles";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import Feed from "./components/Feed";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import ExerciseDetails from "./components/ExerciseDetails";
import Favorites from "./components/Favorites";
import WorkoutDetails from "./components/WorkoutDetails"
import Footer from "./components/Footer";

function App() {
	
	return (
		<BrowserRouter>
			<GlobalStyles />
            <Wrapper>

                <Switch>
                    <Route exact path="/">
                        <NavBar />
                        <HomePage />
                    </Route>

                    <Route exact path="/feed">
                        <NavBar />
                        <Feed />
                    </Route>

                    <Route path="/login">
                        <NavBar />
                        <LogIn />
                    </Route>

                    <Route path="/signup">
                        <NavBar />
                        <SignUp />
                    </Route>

                    <Route path="/profile">
                        <NavBar />
                        <Profile />
                    </Route>

                    <Route path="/exercise-details/:_id">
                        <NavBar />
                        <ExerciseDetails />
                    </Route>

                    <Route path="/favorites">
                        <NavBar />
                        <Favorites />
                    </Route>

                    <Route path="/workout/:id">
                        <NavBar />
                        <WorkoutDetails />
                    </Route>

                </Switch>

                {/* <Footer /> */}
            </Wrapper>
		</BrowserRouter>
	);
}
const Wrapper = styled.div`
    margin-top: 100px;
`;
export default App;
