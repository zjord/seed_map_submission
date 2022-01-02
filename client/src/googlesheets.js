//zhi_dev spreadsheet api

const {GoogleSpreadsheet} = require('google-spreadsheet');
const creds = require('./client_secret.json');
const doc = new GoogleSpreadsheet('1sips_Uhzv8Z7HB4PxsyzrHawt8-BLOghJLAbrDBNvh4'); //initialise the entire googlespreadsheet document



export async function accessSpreadsheet(colour, time, coordinates) {
    await doc.useServiceAccountAuth(creds); //initialise auth
    await doc.loadInfo(); //loads entire doc and worksheets
    const sheet = doc.sheetsByIndex[0]; //initilise first worksheet to const sheet

	
    console.log('Title: ', doc.title, ' Rows: ', sheet.rowCount);

    /*checking if data added properly
    const newdata = {
        Colour: 'Test connection',
        Time: 'fdsfsdfsdfsdf',
        Coordinates: 'QWERTY'
    }
	*/
	//await sheet.addRow(newdata);
	
	//testing 123
	await sheet.addRow({
		Colour: colour,
		Time: time,
		Coordinates: coordinates
	});
	/*
	setColour('')
	setTime('')
	setCoordinates('')
	*/
			
    //Reads in the CURRENT rows in database, if placed before addrow will only read data prior to initialisation
    const rows = await sheet.getRows();
    rows.forEach(row => {
    printShiz(row);
	
   })
	
	//print values from table
	function printShiz(shiz) {
		console.log('Coordinates: ', shiz.Coordinates);
		console.log('Colour: ', shiz.Colour);
		console.log('Date: ', shiz.Time);
		console.log('------------------');
	}

}


