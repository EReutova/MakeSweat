import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { ExercisesProvider } from "./components/ExercisesContext";

ReactDOM.render(
	<React.StrictMode>
		<ExercisesProvider>
			<App />
		</ExercisesProvider>
	</React.StrictMode>,
	document.getElementById('root')
);