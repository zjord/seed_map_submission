// based on tutorial from https://www.taniarascia.com/getting-started-with-react/
//using openweathermap api: visit https://openweathermap.org/weather-data for more weather api information
import React, {Component} from "react";
import axios from 'axios';
import Swal from "sweetalert2";



export default class Form extends Component { // Form: class component
    initialState = {
        col: '',
        lat: '',
        lon: '',
        time: '',
        autoloc: '',
        temp: '',
        hum: ''
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

    //TODO fix popup disappearing when pressing enter
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

    submitForm = async (e) => {
        if ( (this.state.lat && this.state.lon && this.state.img) === '' ){ //this.state.time && this.state.col
            Swal.fire({
                title: "Warning",
                text: "You missed out vital info!",
                confirmButtonText: "Let me double check",
                icon: "warning",
            }).then(/*empty promise*/)
        }
        else {
			e.preventDefault();
            this.props.handleSubmit(this.state);
            let inst = [];
            const API_key = '39f0b3d543c797a3eeecd77ddd38cf51';
            const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${this.state.lat}&lon=${this.state.lon}&appid=${API_key}`;//note units=metric
            console.log(url);

            //get weather api: temperature and humidity
            await axios.get(url).then(res => {
                    console.log(res.data);
                    this.setState({
                        temp: res.data.main.temp,
                        hum: res.data.main.humidity,
                    });
                    //cloned instance of submission object (axios doesn't accept state object)
                     inst = {
                        col: this.state.col,
                        lat: this.state.lat,
                        lon: this.state.lon,
                        time: this.state.time,
                        autoloc: this.state.autoloc,
                        temp: this.state.temp,
                        hum: this.state.hum,
                    }
                }).catch(err => console.log(err));


            console.log(inst);//test1

			//POST request to server endpoint /submit
			await axios.post('/submit', {inst} ).then( (res) => {
				console.log(res);
				console.log(res.data);

				if(res.data === "SUCCESS"){
                    Swal.fire({
                        title: "Entry submitted",
                        html: "Thank you for your submission! <br> You can find your own pin in the map below <br> (Reload the website to see changes)",
                        icon: "success",
                    }).then(/*empty promise*/)
				}
				else{
					Swal.fire({
                        title:"Server connection went wrong",
                        html: "Try again later",
                        icon: "warning",
                    }).then()
				}

			});
			
        }
        this.setState(this.initialState) // clears form
        document.getElementById('fileB').value= null; // resets fileButton text to "No file chosen"
    }

    render() {
        const {col, lat, lon,time} = this.state; //img unused

        return (
            <form action="/submit" onSubmit={this.submitForm}>
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
                    value="SUBMIT"
                    onClick={this.submitForm}/>
            </form>
        )
    }
}