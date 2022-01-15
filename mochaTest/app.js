const {GoogleSpreadsheet} = require('google-spreadsheet');

module.exports = {

    colourValid: function(colour) {// checks length and ensures colour string is purely alphabetical
    let valid = true
    if(colour.length > 16 || (!/^[a-zA-Z]+$/.test(colour))){
        // Swal.fire({
        //     title: "Warning",
        //     text: "That wasn't a valid colour!",
        //     confirmButtonText: "Let me double check",
        //     icon: "warning",
        // }).then(/*empty promise*/)
        valid = false
    }
    return valid
},
    coordsValid: function(lat, lon){//validates location is purely numerical
    let valid = true;
    if((/^[a-zA-Z]+$/.test(lat)) || (/^[a-zA-Z]+$/.test(lon))){
        // Swal.fire({
        //     title: "Warning",
        //     text: "We can't accept these coordinates!",
        //     confirmButtonText: "Let me double check",
        //     icon: "warning",
        // }).then(/*empty promise*/)
        valid = false
    }
    return valid;
},
    missingval: function(lat, lon, img, time, col, date){
    let missing = false
    if((lat && lon && img && time && col && date) === ''){
        // Swal.fire({
        //     title: "Warning",
        //     text: "You missed out vital info!",
        //     confirmButtonText: "Let me double check",
        //     icon: "warning",
        // }).then(/*empty promise*/)
        missing = true;
    }
    return missing;
},
    accessSpreadsheet: async function(obj, creds) {
        let done = 0;

        try{
            const doc = new GoogleSpreadsheet('1laEZJYS1Tf8mr6k5gDk3rKlZhngPqJv79EbZdzYxkvo'); //initialise the entire googlespreadsheet document
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
}