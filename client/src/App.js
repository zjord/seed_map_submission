// based on tutorial from https://www.taniarascia.com/getting-started-with-react/
// TODO investigate dependence on "public" folder (eg, index.html)
import React, {Component} from 'react'
import Form from "./Form";
import logo from "./static/assets/jemilicious_logo.png"
import dandelion from './static/Icon/dandelion_icon_colored.png'
import {AddMarkers} from "./markers";
import {MapContainer, Marker, TileLayer} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import {Icon} from "leaflet/dist/leaflet-src.esm";

export default class App extends Component {
    state = {
        dData: [], //dandelionData
        marker: [],
    }

     componentDidMount() { //Use AddMarkers to grab coordinates from google sheets, set marker state to array of coords
         AddMarkers().then(r => {
             this.setState({marker: r});
             console.log(r)
         })
     }


    handleSubmit = (cdData) => { //current dandelionData
        this.setState({
            dData: [...this.state.dData, cdData],
          })
    }
    render() {
        return (
            <div className="container" style={{"padding-top": '2em'}}>
                    {/*logo, title and imperial college london 2021/2022*/}
                <img className={'img inline'}  src={logo} alt={"logo"}/>    {/*inline logo*/}
                <h1 className={'small inline'}>Dandelion Seed Mapping Project</h1>      {/*small capitals inline title*/}
                <p className={'inline'}>ZJORD, Imperial College 2021/22<br/></p>     {/*inline text*/}

                {/*about section*/}
                <div className={'horizontal'} style={{"margin-top":'1em',"margin-bottom":'2em'}}/>
                <p  style={{"margin-right":'1em', "font-weight":'bold'}}> ABOUT</p>
                <p style={{"margin-left":'1em',"margin-right":'1em','margin-botton':'1em'}}> The goal of this website is to collect data from the general public about the location of dandelion seeds all released from our
                    lab at Imperial College London.<br/><br/> Nature has invented ways many ways to fly however unlike the muscle based flight of animals, plants have developed
                    clever structural designs to utilise wind. We want to track dandelion seeds by painting them a bright colour for you to find and input into this website.</p>
                    <a style={{'margin':'2em'}} href="https://www.bfflab.org/research.html" className="button">READ MORE</a>

                {/*instruction section*/}
                <p style={{"margin-left":'0.5em',"margin-top":'1.5em', "font-weight":'bold'}}> INSTRUCTIONS</p>
                <p style={{"margin-left":'2em',"margin-right":'2em'}}> If you have found a dandelion that is an unnatural colour, you have found one of the many dandelion seeds that we have released, use
                this website to upload a picture of the seed along with the time and location when you found it.</p>
                    <p style={{"margin-left":'3em'}}>‣find a painted dandelion seed<br/>‣take a photo of seed<br/>
                        ‣submit the photo along with the location and time of where and when you found the seed</p>
                <div className={'horizontal'} style={{"margin-top":'1em',"margin-bottom":'1em'}}/>
                <div style={{"max-width":'600px'}}>
                    <h3 className={'small'}>add new entry!</h3>
                    <Form
                        handleSubmit={this.handleSubmit} /></div>
                <div className={'horizontal'} style={{"margin-top":'1em',"margin-bottom":'0.5em'}}/>
                <h3 className={'small'} style={{textAlign: "center"}}> here are all the found dandelion seeds so far! </h3>
                <MapContainer
                    className="map"
                    center={[51.5072, -0.118092]}
                    zoom={10}
                    style={{ height: 500, width: "100%" }}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

                    {this.state.marker.map(coord => // Maps all coordinates onto React Markers
                        <Marker
                        key = {Math.random()}
                        position = {coord}
                        icon = { new Icon({
                            iconUrl: dandelion,
                            iconRetinaUrl: dandelion,
                            iconSize: [65,65],
                            iconAnchor: [10,65] //makes dandelion shoot the tip of the pin
                             })}
                        /> )}
                </MapContainer>
                <div className={'horizontal'} style={{"margin-top":'1em',"margin-bottom":'1em'}}/>
                <footer>
                    <p>
                        Imperial College London Bioengineering Department: A Year 3 Undergraduate Project
                    </p>
                </footer>
            </div>
        )
    }
}
