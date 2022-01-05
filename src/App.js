// based on tutorial from https://www.taniarascia.com/getting-started-with-react/
import React, {Component} from 'react'
import Table from './Table'
import Form from "./Form";
import {AddMarkers} from "./markers";

//from oscar_dev
// TODO investigate dependence on "public" folder (eg, index.html)
// Marker, Popup and Icon are unused atm, will be used to plot dandelion locs on map
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import MyMap from "./MyMap";

export default class App extends Component {
    state = {
        dData: [], //dandelionData
    }

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
        const {dData} = this.state
        console.log(this.state)

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
                <MyMap/>
            </div>
        )
    }
}