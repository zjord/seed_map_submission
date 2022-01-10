// const {GoogleSpreadsheet} = require('google-spreadsheet');
// const creds = require('./client_secret.json');
// const doc = new GoogleSpreadsheet('1laEZJYS1Tf8mr6k5gDk3rKlZhngPqJv79EbZdzYxkvo'); //initialise the entire googlespreadsheet document
//
//
// export async function AddMarkers() {
//     await doc.useServiceAccountAuth(creds); //initialise auth
//     await doc.loadInfo(); //loads entire doc and worksheets
//     const sheet = doc.sheetsByIndex[0]; //initilise first worksheet to const sheet
//
//     const markers = [];
//     const rows = await sheet.getRows();
//     rows.forEach(row => {
//         markers.push([row.Latitude, row.Longitude])
//     })
//
//     return (markers);
// }
