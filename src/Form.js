// based on tutorial from https://www.taniarascia.com/getting-started-with-react/
import React, {Component} from "react";

//better alerts
import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content" //not needed for now

//access to G.Sheets database
import {accessSpreadsheet} from './googlesheets.js';

export default class Form extends Component { // Form: class component
    initialState = {
        col: '',
        lat: '',
        lon: '',
        time: '',
        img: '',
        autoloc: ''
    }
    state = this.initialState;

    handleDataChange = e => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    handleImgChange = e => {
        const img = e.target.files[0]
        this.setState({img: img})
    }

    handleKeypress = e => {
        if (e.keyCode === 13){ this.submitForm() }
    }

    grabLocation = () => {
        navigator.geolocation.getCurrentPosition(
            success => {
                Swal.fire({
                    title: "Location grabbed!",
                    confirmButtonText: "Nice!",
                    icon: "success",
                }).then(() => {
                    this.setState({
                        lat: success.coords.latitude,
                        lon: success.coords.longitude,
                        autoloc: 'Auto'
                    })
                })
            },
            error => {
                Swal.fire({
                    title: "Error!",
                    html: 'Pro Tip: Reset your device\'s permissions and reload the website.<br>' +
                        'If that fails, please input the coordinates manually',
                    confirmButtonText: "Aw man",
                    footer: 'Pro Tip 2: Use Google Maps to find the approx coordinates',
                    icon: "error",
                }).then(() => {
                    console.log("Error while grabbing user's loc:")
                    console.log(error)
                    this.setState({
                        autoloc: 'Manual'
                    })
                })
            }
        )
    }

    submitForm = () => {
        if ( (this.state.lat && this.state.lon && this.state.img) === '' ){ //this.state.time && this.state.col
            Swal.fire({
                title: "Warning",
                text: "You missed out vital info!",
                confirmButtonText: "Let me double check",
                icon: "warning",
            }).then(/*empty promise*/)
        }
        else {
            this.props.handleSubmit(this.state)
            accessSpreadsheet(this.state.col, this.state.lat, this.state.lon, this.state.time, this.state.autoloc, this.state.img)
                .then(() => console.log('Spreadsheet accessed'));
            Swal.fire({
                title: "Entry submitted",
                html: "Thank you for your submission! <br> You can find your own pin in the map below",
                icon: "success",
            }).then(/*empty promise*/)
        }

        this.setState(this.initialState); // clears form
        document.getElementById('fileB').value= null; // resets fileButton text to "No file chosen"
    }

    render() {
        const {col, lat, lon, time} = this.state; //img unused

        return (
            <form>
                <label htmlFor="col">Colour</label>
                <input
                    type="text"
                    name="col"
                    id="col"
                    value={col}
                    onChange={this.handleDataChange}
                    onKeyDown={this.handleKeypress}/>
                <label htmlFor="lat">Latitude</label>
                <input
                    type="text"
                    name="lat"
                    id="lat"
                    value={lat}
                    onChange={this.handleDataChange}
                    onKeyDown={this.handleKeypress}/>
                <label htmlFor="lon">Longitude</label>
                <input
                    type="text"
                    name="lon"
                    id="lon"
                    value={lon}
                    onChange={this.handleDataChange}
                    onKeyDown={this.handleKeypress}/>
                <input
                    type="button"
                    name="locB"
                    value="Use my location!"
                    onClick={this.grabLocation}/>

                <label htmlFor="time">Time</label>
                <input
                    type="time"
                    name="time"
                    id="time"
                    value={time}
                    onChange={this.handleDataChange}
                    onKeyDown={this.handleKeypress}/>

                <label htmlFor="img">Image</label>
                <input
                    accept="image/*"
                    type="file"
                    id="fileB"
                    capture="environment" //enable mobile external camera instead of file selection
                    onChange={this.handleImgChange}/>

                <input
                    type="button"
                    value="Submit"
                    onClick={this.submitForm}/>
            </form>
        )
    }
}