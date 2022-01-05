//zhi_dev spreadsheet api

const {GoogleSpreadsheet} = require('google-spreadsheet');
const creds = require('./client_secret.json');
const doc = new GoogleSpreadsheet('1laEZJYS1Tf8mr6k5gDk3rKlZhngPqJv79EbZdzYxkvo'); //initialise the entire googlespreadsheet document

export async function accessSpreadsheet(col,lat,lon,time,autoloc){ //,img
    await doc.useServiceAccountAuth(creds); //initialise auth
    await doc.loadInfo(); //loads entire doc and worksheets
    const sheet = doc.sheetsByIndex[0]; //initialise first worksheet to const sheet

    console.log('Title: ', doc.title, ' Rows: ', sheet.rowCount);

	await sheet.addRow({
		Colour: col,
        Latitude: lat,
        Longitude: lon,
        Time: time,
        Auto: autoloc
	    },
        {insert: true}); //prevents entries overwriting each other, in theory
        //from https://github.com/theoephraim/node-google-spreadsheet/issues/316
	/*
	setColour('')
	setTime('')
	setCoordinates('')
	*/

    // Reads in the CURRENT rows in database, if placed before addrow will only read data prior to initialisation
    const rows = await sheet.getRows();
    rows.forEach( row => { printShiz(row) })

	//print values from table
	function printShiz(shiz) {
        console.log(
            'Coordinates: ', shiz.Latitude,'-', shiz.Longitude, "\n",
            'Colour: ', shiz.Colour,"\n",
            'Date: ', shiz.Time,"\n",
            'Auto/Manual: ',shiz.Auto,"\n",
            '------------------');

        // old method
		// console.log('Coordinates: ', shiz.Latitude,'-', shiz.Longitude);
		// console.log('Colour: ', shiz.Colour);
		// console.log('Date: ', shiz.Time);
		// console.log('------------------');
	}

}

//accessSpreadsheet();
