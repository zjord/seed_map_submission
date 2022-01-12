// server/index.js

const path = require('path');
const express = require("express");
const {validationResult} = require('express-validator');
const app = express();
const {GoogleSpreadsheet} = require('google-spreadsheet');
const creds = require('./client_secret.json');
const doc = new GoogleSpreadsheet('1laEZJYS1Tf8mr6k5gDk3rKlZhngPqJv79EbZdzYxkvo'); //initialise the entire googlespreadsheet document

async function accessSpreadsheet(col, lat, lon, time, autoloc, temp, hum, imgurl){
	await doc.useServiceAccountAuth(creds); //initialise auth
	await doc.loadInfo(); //loads entire doc and worksheets
	const sheet = doc.sheetsByIndex[0]; //initilise first worksheet to const sheet

	console.log('Title: ', doc.title, ' Rows: ', sheet.rowCount);

	//add row with values 
	await sheet.addRow({
		Colour: col,
		Latitude: lat,
		Longitude: lon,
		Time: time,
		Temperature: temp,
		Humidity: hum,
		Auto: autoloc,
		Image: '=IMAGE("' + imgurl + '", 1)'
		},
		{insert: true}); //prevents entries overwriting each other, in theory
	//from https://github.com/theoephraim/node-google-spreadsheet/issues/316


//    //Reads in the CURRENT rows in database, if placed before addrow will only read data prior to initialisation
//    const rows = await sheet.getRows();
//    rows.forEach(row => {printShiz(row)})
//
//
// 	//print values from table
// 	function printShiz(shiz) {
// 		console.log(
// 			'Coordinates: ', shiz.Latitude, '-', shiz.Longitude, "\n",
// 			'Colour: ', shiz.Colour, "\n",
// 			'Date: ', shiz.Time, "\n",
// 			'Auto/Manual: ', shiz.Auto, "\n",
// 			'------------------');
// 	}
 }

app.use( express.json() );

app.use( express.urlencoded({
	extended: true
}));

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

/-------------ROUTE HANDLERS-------------/

// Handle POST requests to /submit route
app.post("/submit", (req, res) => {
	
	//FORM DATA VALIDATION from: https://express-validator.github.io/docs/validation-result-api.html
	const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
		// Build your resulting errors however you want! String, object, whatever - it works!
		return `${location}[${param}]: ${msg}`;
	};
	 
	//Extract the validation errors from a request.
	const result = validationResult(req).formatWith(errorFormatter);
	
	if (!result. isEmpty()) {
		// Response will contain something like
		// { errors: [ "body[password]: must be at least 10 chars long" ] }
		return res.json({ errors: result.array() });
	}
	
	// Handle your request as if no errors happened
	
	(async function () {
		await accessSpreadsheet(req.body.inst.col, req.body.inst.lat, req.body.inst.lon, req.body.inst.time, req.body.inst.autoloc,req.body.inst.temp,req.body.inst.hum, req.body.inst.imgurl)
		.then(res.send("SUCCESS"))
		.catch(err=>{
		res.send(err);});
	})();
	
	
});

// Handles GET request for seed coordinates
app.get('/seeds', (req, res) =>{

	let coords = [];

	(async function () {
		await doc.useServiceAccountAuth(creds); //initialise auth
		await doc.loadInfo(); //loads entire doc and worksheets
		const sheet = doc.sheetsByIndex[0]; //initilise first worksheet to const sheet


		const rows = await sheet.getRows();
		rows.forEach(row => {
			coords.push([row.Latitude, row.Longitude])
		})

		res.send(coords);
	})();

})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// Listening port number
const PORT =  3000;//process.env.PORT ||
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
})

