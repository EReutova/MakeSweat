import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import GlobalStyles from "./GlobalStyles";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import Account from "./components/Account";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import SignOut from "./components/SignOut";
import ExerciseDetails from "./components/ExerciseDetails";
import Footer from "./components/Footer";

function App() {
	
	return (
		<BrowserRouter>
			<NavBar />
			<GlobalStyles />
            <Wrapper>

                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    
                    <Route path="/account/:_id">
                        <Account />
                    </Route>

                    <Route path="/login">
                        <LogIn />
                    </Route>

                    <Route path="/signup">
                        <SignUp />
                    </Route>

                    <Route path="/signout">
                        <SignOut />
                    </Route>

                    <Route path="/exercise-details/:id">
                        <ExerciseDetails />
                    </Route>
                </Switch>

                <Footer />
            </Wrapper>
		</BrowserRouter>
	);
}
const Wrapper = styled.div`
    margin-top: 100px;
`;
export default App;
