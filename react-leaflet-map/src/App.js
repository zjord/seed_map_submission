import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './App.css';
import { Icon } from "leaflet";
import * as pubData from "./data/pubs.json"; //This is just an example of geojson data

function App() {
    return (
        <MapContainer center={[51.5072, -0.118092]} zoom={11}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
{/*            <Marker
                key = {pubData.features[0].properties.fsa_ID}
                position = {[pubData.features[0].geometry.coordinates[1],pubData.features[0].geometry.coordinates[0]]}
            />*/} {/*Idk why this doesnt turn the data into markers,I get a weird error*/}
        </MapContainer>
    );

}

export default App;
