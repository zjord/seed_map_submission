// based on tutorial from https://www.taniarascia.com/getting-started-with-react/
import React, {Component} from 'react'
import Table from './Table'
import Form from "./Form";
import {AddMarkers} from "./markers";
import dandelion from './static/icon/dandelion.png'

//from oscar_dev
// TODO investigate dependence on "public" folder (eg, index.html)
// Marker, Popup and Icon are unused atm, will be used to plot dandelion locs on map

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import {Icon} from "leaflet/dist/leaflet-src.esm";

export default class App extends Component {
    state = {
        dData: [], //dandelionData
        marker: []
    }

    componentDidMount() {
        AddMarkers()
            .then(r=>this.setState({marker: r}))
            .then(r=>console.log(r))

    }//Use AddMarkers to grab coordintes from google sheets, set marker state to array of coords


    remove_dData = index => {
        const {dData} = this.state.dData
        this.setState({
            dData: dData.filter((cdData, i) => {
                return i !== index;
            })
        });
    }
    handleSubmit = (cdData) => { //current dandelionData
        this.setState({
            dData: [...this.state.dData, cdData],
          })
    }
    render() {
        const {dData} = this.state;
        console.log(this.state);

        // const pin = new L.Icon({
        //     iconUrl: require('./static/icon/seed.png'),
        //     iconSize: [50,50]
        // })

        return (
            <div className="container">
                <h1 style={{textAlign: "center"}}>React-based User Input Webapp</h1>
                <h4 style={{textAlign: "center"}}>Dandelion Seed Mapping Project</h4>
                <p style={{textAlign: "center"}}>ZJORD, Imperial College 2021/22</p>
                <p style={{textAlign: "left"}}>[Preview table]</p>
                <Table
                    dData={dData}
                    remove_dData={this.remove_dData} />
                <h3>Add new entry</h3>
                <Form
                    handleSubmit={this.handleSubmit} />
                <p style={{textAlign: "center"}}> Here are all the found dandelion seeds so far! </p>


                <MapContainer
                    className="map"
                    center={[51.5072, -0.118092]}
                    zoom={10}
                    style={{ height: 500, width: "100%" }}
                >
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {this.state.marker.map(coord=> <Marker
                        key = {Math.random()}
                        position = {coord}
                        icon = { new Icon({
                            iconUrl: dandelion,
                            iconRetinaUrl: dandelion,
                            iconSize: [65,65]
                             })}
                        // Maps all coordinates onto React Markers
                    />
                    )}

                </MapContainer>
            </div>
        )
    }
}
