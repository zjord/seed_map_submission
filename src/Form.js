// based on tutorial from https://www.taniarascia.com/getting-started-with-react/
import React, {Component} from "react";

//from roy_dev
import {accessSpreadsheet} from './googlesheets.js';

export default class Form extends Component { // Form: class component
    initialState = {
        col: '',
        lat: '',
        lon: '',
        time: '',
        img: '',
    }
    state = this.initialState;

    handleDataChange = e => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    handleImgChange = e => {
        const img = e.target.files[0]
        console.log(img)
        this.setState({img: img})
    }

    handleKeypress = e => {
        if (e.keyCode === 13){
            this.submitForm()
            console.log("enter pressed")
        }
        console.log("key_press")
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            // function(position) {
            //     console.log(position.coords)
            // },

            // very wishy-washi way of slapping coordinates into form
            success =>
                this.setState({
                    lat: success.coords.latitude,
                    lon: success.coords.longitude,
                }),
            function(error) {
                console.error("Error Code = " + error.code + " - " + error.message);
            }
        );
        // at this point, state = ''
    }

    submitForm = () => {
        //TODO automize empty data handling for all states
        //if ( (this.state.col && this.state.lat && this.state.lon && this.state.img ) === '' ){
        if ( (this.state.lat && this.state.lon && this.state.img) === '' ){ //this.state.time && this.state.col
            alert("empty form box! :(")
        }
        else {
            this.props.handleSubmit(this.state)
            //TODO accessSpreadsheet implementation
            console.log(this.state);
            accessSpreadsheet(this.state.col, this.state.lat, this.state.lon, this.state.time,this.state.img);
            //console.log(this.state);
        }

        this.setState(this.initialState) // clears form
        document.getElementById('fileB').value= null; // resets fileButton text to "No file chosen"
    }

    render() {
        const {col, lat, lon,time} = this.state; //img unused

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
                    capture = "environment"
                    onChange={this.handleImgChange}/>

                <input
                    type="button"
                    value="SUBMIT"
                    onClick={this.submitForm}/>
            </form>
        )
    }
}