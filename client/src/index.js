import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { ExercisesProvider } from "./components/ExercisesContext";
import { UserProvider } from "./components/UserContext";

ReactDOM.render(
	<React.StrictMode>
		<UserProvider>
			<ExercisesProvider>
				<App />
			</ExercisesProvider>
		</UserProvider>
	</React.StrictMode>,
	document.getElementById('root')
);