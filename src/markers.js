import {map, Marker} from "leaflet/dist/leaflet-src.esm";
import React from "react";

const {GoogleSpreadsheet} = require('google-spreadsheet');
const creds = require('./client_secret.json');
const doc = new GoogleSpreadsheet('1sips_Uhzv8Z7HB4PxsyzrHawt8-BLOghJLAbrDBNvh4');


export async function AddMarkers(markers) {
    await doc.useServiceAccountAuth(creds); //initialise auth
    await doc.loadInfo(); //loads entire doc and worksheets
    const sheet = doc.sheetsByIndex[0]; //initilise first worksheet to const sheet

    const rows = await sheet.getRows();
    rows.forEach(row => {
        markers.push([row.Latitude, row.Longitude])
    })
    return (markers);
}
//Could try exporting markers but I've run into issues with async functions
