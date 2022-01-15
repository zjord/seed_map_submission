const path = require('path');
const express = require("express");
const {validationResult} = require('express-validator');
const app = express();
const {GoogleSpreadsheet} = require('google-spreadsheet');
const creds = require('./client_secret.json');
const weatherKey = require('./weather_key.json');
const doc = new GoogleSpreadsheet('1laEZJYS1Tf8mr6k5gDk3rKlZhngPqJv79EbZdzYxkvo'); //initialise the entire googlespreadsheet document

async function accessSpreadsheet(obj){
	let done = 0;

	try{
		await doc.useServiceAccountAuth(creds); //initialise auth
		await doc.loadInfo(); 					//loads entire doc and worksheets
		const sheet = doc.sheetsByIndex[0]; 	//initialise first worksheet to const sheet
		console.log('Title: ', doc.title, ' Rows: ', sheet.rowCount);

		await sheet.addRow({ //add row with values
				Colour: obj.col,
				Latitude: obj.lat,
				Longitude: obj.lon,
				Time: obj.time,
				Date: obj.date,
				Temperature: obj.temp,
				Humidity: obj.hum,
				Auto: obj.autoloc,
				Image: '=IMAGE("' + obj.imgurl + '", 1)'
			},
			{insert: true,});//prevents entries overwriting each other
		//from https://github.com/theoephraim/node-google-spreadsheet/issues/316}catch{}

		done = 1;
	}catch(err){
		console.log('Error has occured: '+ err.stack);
	}
	return done
}

app.use( express.json() );

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

//-----------------------------------------ROUTE HANDLERS----------------------------------------------------------//

// Handle POST requests to /submit route
app.post("/submit", (req, res) => {
	(async function () {
		await accessSpreadsheet(req.body.inst)
			.then(res.send("SUCCESS"))
			.catch(err=>{
			res.send(err);
			});
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

// Handles GET request for weather API key
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