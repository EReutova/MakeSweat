import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import NavBar from "./components/NavBar";
import RandomQuote from "./components/RandomQuote"
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
			<GlobalStyles />
			<NavBar />
            <RandomQuote />

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
		</BrowserRouter>
	);
}

export default App;
