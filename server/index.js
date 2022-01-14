const path = require('path');
const express = require("express");
const {validationResult} = require('express-validator');
const app = express();
const {GoogleSpreadsheet} = require('google-spreadsheet');
const creds = require('./client_secret.json');
const weatherKey = require('./weather_key.json');
const doc = new GoogleSpreadsheet('1laEZJYS1Tf8mr6k5gDk3rKlZhngPqJv79EbZdzYxkvo'); //initialise the entire googlespreadsheet document

async function accessSpreadsheet(col, lat, lon, time, date, autoloc, temp, hum, imgurl){
	await doc.useServiceAccountAuth(creds); //initialise auth
	await doc.loadInfo(); 					//loads entire doc and worksheets
	const sheet = doc.sheetsByIndex[0]; 	//initialise first worksheet to const sheet

	console.log('Title: ', doc.title, ' Rows: ', sheet.rowCount);

	await sheet.addRow({ //add row with values
		Colour: col,
		Latitude: lat,
		Longitude: lon,
		Time: time,
		Date: date,
		Temperature: temp,
		Humidity: hum,
		Auto: autoloc,
		Image: '=IMAGE("' + imgurl + '", 1)'
		},
		{insert: true,
		}); //prevents entries overwriting each other
		//from https://github.com/theoephraim/node-google-spreadsheet/issues/316
}

app.use( express.json() );

app.use( express.urlencoded({
	extended: true
}));

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

//-------------ROUTE HANDLERS-------------//

// Handle POST requests to /submit route
app.post("/submit", (req, res) => {
	
	//FORM DATA VALIDATION from: https://express-validator.github.io/docs/validation-result-api.html
	const errorFormatter = ({ location, msg, param }) => {
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
		await accessSpreadsheet(
			req.body.inst.col,
			req.body.inst.lat,
			req.body.inst.lon,
			req.body.inst.time,
			req.body.inst.date,
			req.body.inst.autoloc,
			req.body.inst.temp,
			req.body.inst.hum,
			req.body.inst.imgurl
		)
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
		await doc.loadInfo(); 					//loads entire doc and worksheets
		const sheet = doc.sheetsByIndex[0]; 	//initialise first worksheet to const sheet

		const rows = await sheet.getRows();
		rows.forEach(row => {
			if(row.Latitude || row.Longitude != null) {
				coords.push([row.Latitude, row.Longitude])
			}
		})
		res.send(coords);
	})();

})

app.get("/key",(req,res)=>{
	res.json(weatherKey);
})
// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// Listening port number
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
})