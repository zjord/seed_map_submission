// based on tutorial from https://www.taniarascia.com/getting-started-with-react/
import React, {Component} from 'react'
import Table from './Table'
import Form from "./Form";

//from oscar_dev
// TODO investigate dependence on "public" folder (eg, index.html)
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
// Marker, Popup and Icon are unused atm, will be used to plot dandelion locs on map

export default class App extends Component {
    // TODO add comments dawg
    state = {
        dData: [],
    }

    remove_dData = index => {
        const {dData} = this.state
        this.setState({
            dData: dData.filter((cdData, i) => {
                return i !== index;
            })
        });
    }

    handleSubmit = (cdData) => {
        this.setState({
            dData: [...this.state.dData, cdData],
          })
    }

    render() {
        const {dData} = this.state

        return (
            <div className="container">
                <h1 style={{textAlign: "center"}}>React-based User Input Webapp</h1>
                <h4 style={{textAlign: "center"}}>Dandelion Seed Mapping Project</h4>
                <p style={{textAlign: "center"}}>ZJORD, Imperial College 2021/22</p>
                <Table
                    dData={dData}
                    remove_dData={this.remove_dData} />
                <h3>Add new entry</h3>
                <Form
                    handleSubmit={this.handleSubmit} />
                <MapContainer
                    center={[51.5072, -0.118092]}
                    zoom={12}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                </MapContainer>
            </div>
        )
    }
}