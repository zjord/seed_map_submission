// based on tutorial from https://www.taniarascia.com/getting-started-with-react/
import React, {Component} from 'react'
import Table from './Table'
import Form from "./Form";
import logo from "./assets/image.png"
import description from "./assets/description.txt"

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
            <div className="container" style={{"padding-top": '5em'}}>
                <img className={'img inline'}  src={logo} alt={"logo"}/>
                <h1 className={'small inline'}>Dandelion Seed Mapping Project</h1>
                <p className={'inline'}>ZJORD, Imperial College 2021/22</p>
                <div className={'horizontal'} style={{"margin-top":'1em',"margin-bottom":'1em'}}/>
                <p style={{"margin-left":'0.5em', "font-weight":'bold'}}> ABOUT</p>
                <p style={{"margin-left":'2em',"margin-right":'2em'}}> The goal of this website is to collect data from the general public about the location of dandelion seeds all released from our
                    lab at Imperial College London.<br/><br/> Nature has invented ways many ways to fly however unlike the muscle based flight of animals, plants have developed
                    clever structural designs to utilise wind. We want to track dandelion seeds by painting them a bright colour for you to find and input into this website.
                </p>
                <p style={{"margin-left":'0.5em', "font-weight":'bold'}}> INSTRUCTIONS</p>
                <p style={{"margin-left":'2em',"margin-right":'2em'}}> If you have found a dandelion that is an unnatural colour, you have found one of the many dandelion seeds that we have released, use
                this website to upload a picture of the seed along with the time and location when you found it.</p>
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