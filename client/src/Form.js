// based on tutorial from https://www.taniarascia.com/getting-started-with-react/
//using openweathermap api: visit https://openweathermap.org/weather-data for more weather api information
import React, {Component} from "react";
import axios from 'axios';
//TODO: invalid input handling,(e.g. col must be less than 10 characters)
//TODO: retrieving coordinates from gsheet for map,
//TODO: send image to gsheet

export default class Form extends Component { // Form: class component
    
	initialState = {
		col: '',
		lat: '',
		lon: '',
		time: '',
		img: '',
        temp: '',
        hum: '',
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



    submitForm = async (e) => {

        //TODO automize empty data handling for all states
        if ( (this.state.lat && this.state.lon && this.state.img) === '' ){ //this.state.time && this.state.col
            alert("empty form box! :(")
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
                        img: this.state.img,
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
					alert("Dandelion(s) Submitted!");
				}
				else{
					alert(`Something went wrong: ${res}`);
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
                    type="submit"
                    value="Submit"
                    />
            </form>






        )
    
    }
}