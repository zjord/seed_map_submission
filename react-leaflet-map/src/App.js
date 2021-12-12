import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './App.css';
import { Icon } from "leaflet";
import * as pubData from "./data/fulham_pubs.json"; //This is just an example of geojson data

function App() {

    return (
        <MapContainer center={[51.5072, -0.118092]} zoom={11}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {pubData.features.map(pub => (
                <Marker
                    key={pub.properties.fsa_ID}
                    position={[pub.geometry.coordinates[1], pub.geometry.coordinates[0]]}
                />
            ))}
        </MapContainer>
    );

}

export default App;
