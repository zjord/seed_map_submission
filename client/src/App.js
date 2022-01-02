import React, {useEffect, useState} from "react";
import logo from './logo.svg';
import './App.css';
import {accessSpreadsheet} from './googlesheets.js';


function App() {
	const [data, setData]  = React.useState(null);
	const [hello, setHello] = useState('No data');
	
	const [colour, setColour] = useState('')
	const [time, setTime] = useState('')
	const [coordinates, setCoordinates] = useState('')

	
	React.useEffect( () => {
		fetch("/api")
			.then( (res) => res.json())
			.then( (data) => setData(data.message));
		}, []);
	
	
	
	return(
		<div>

			<div>
				<label>Colour: </label>
				<input type="colour"
					   value={colour}
					   onChange={e => setColour(e.target.value)}>
				</input>
				<label>Time: </label>
				<input type="time"
					   value={time}
					   onChange={e => setTime(e.target.value)}>
				</input>
			</div>
			<div>
            <textarea
				value={coordinates}
				onChange={e => setCoordinates(e.target.value)}>
            </textarea>
			</div>
			<p>
				<button 
					type="button"
					onClick={() => accessSpreadsheet(colour, time, coordinates)}
				>
					Complete
				</button>
			</p>
			
		</div>
	)

}
	
	

export default App;
