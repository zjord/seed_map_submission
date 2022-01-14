// based on tutorial from https://www.taniarascia.com/getting-started-with-react/
// imageupload based from https://medium.com/geekculture/how-to-upload-images-to-cloudinary-with-a-react-app-f0dcc357999c
//using openweathermap api: visit https://openweathermap.org/weather-data for more weather api information
import React, {Component} from "react";
import axios from 'axios';
import Swal from "sweetalert2";

export default class Form extends Component { // Form: class component
    initialState = {
        col: '',
        lat: '',
        lon: '',
        img: '',
        imgurl: '',
        time: '',
        date: '',
        autoloc: 'Manual',
        temp: '',
        hum: ''
    }
    state = this.initialState;

    handleDataChange = e => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    // handleColChange = e => {
    //     const {colour, value} = e.target
    //     if(colour.length > 12 && (!/^[a-zA-Z]+$/.test(colour))){// Input validation: checks length and makes sure colour string is purely alphabetical
    //         Swal.fire({
    //             title: "Warning",
    //             text: "That wasn't a valid colour!",
    //             confirmButtonText: "Let me double check",
    //             icon: "warning",
    //         }).then(/*empty promise*/)
    //     }
    //     else {
    //         this.setState({col: value})
    //     }
    // }

    //uploads image to cloudinary
    handleImgChange = e => {
        const image = e.target.files[0]
        console.log('Image size: ')
        console.log(image.size)
        if (image.size >= 15000000) {
            Swal.fire({
                title: "Warning",
                text: "File size is too large!(Must be smaller than 15MB)",
                icon: "warning",
            }).then(/*empty promise*/)
            this.setState({img: this.initialState.img}) // clears img state
            document.getElementById('fileB').value= null; // resets fileButton text to "No file chosen"
        }
        else {
            this.setState({img: image}) //avoids invalid submission
        }
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

    //validates entry and sends data to google sheets database with temp&humid data
    submitForm = async (e) => {
        
        if ( (this.state.lat && this.state.lon && this.state.img && this.state.time && this.state.col && this.state.date) === '' ){
            Swal.fire({
                title: "Warning",
                text: "You missed out vital info!",
                confirmButtonText: "Let me double check",
                icon: "warning",
            }).then(/*empty promise*/)
        }
        else if(this.state.col.length > 10){// Input validation: checks length and makes sure colour string is purely alphabetical
            Swal.fire({
                title: "Warning",
                text: "That wasn't a valid colour!",
                confirmButtonText: "Let me double check",
                icon: "warning",
            }).then(/*empty promise*/)
        }
        else {
            e.preventDefault();

            // uploads image to cloudinary for hosting to google sheets
            const pic = new FormData()
            pic.append("file", this.state.img)
            pic.append("upload_preset", "dandelion")
            pic.append("cloud_name","zjordseeds")
            await fetch("https://api.cloudinary.com/v1_1/zjordseeds/image/upload",{
                method:"post",
                body: pic
            })
                .then(resp => resp.json())
                .then(pic => {
                    this.setState({imgurl: pic.url})
                })
                .catch(err => console.log(err))

            if (this.state.imgurl === '' ){
                Swal.fire({
                    title: "Unable to upload image",
                    html: "Try again",
                    icon: "warning",
                }).then(/*empty promise*/)
            }
            else {
                let inst = [];
                this.props.handleSubmit(this.state);
                const API_key = '39f0b3d543c797a3eeecd77ddd38cf51';
                const unixTime = parseInt((new Date('2022.01.13').getTime() / 1000).toFixed(0))
                const url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?units=metric&lat=${this.state.lat}&lon=${this.state.lon}&dt=${unixTime}&appid=${API_key}`
                //const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${this.state.lat}&lon=${this.state.lon}&appid=${API_key}`;//note units=metric
                console.log(url);
                console.log("State right before submission")
                console.log(this.state)


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
                        date: this.state.date,
                        autoloc: this.state.autoloc,
                        temp: this.state.temp,
                        hum: this.state.hum,
                        imgurl: this.state.imgurl
                    }
                }).catch(err => console.log(err));

                console.log(inst);//test1

                //POST request to server endpoint /submit
                await axios.post('/submit', {inst}).then((res) => {
                    console.log(res);
                    console.log(res.data);

                    if (res.data === "SUCCESS") {
                        Swal.fire({
                            title: "Entry submitted",
                            html: "Thank you for your submission! <br> You can find your own pin in the map below <br> (Reload the website to see changes)",
                            icon: "success",
                        }).then(/*empty promise*/)
                    } else {
                        Swal.fire({
                            title: "Server connection went wrong",
                            html: "Try again later",
                            icon: "warning",
                        }).then()
                    }
                });

                console.log("State right after axios.post")
                console.log(this.state)
            }
        }
        this.setState(this.initialState) // clears form
        document.getElementById('fileB').value= null; // resets fileButton text to "No file chosen"
    }

    render() {
        const {col, lat, lon,time,date} = this.state;


        return (
            <form>
                <label htmlFor="col">Colour</label>
                <input
                    type="text"
                    name="col"
                    id="col"
                    value={col}
                    placeholder={"e.g. red"}
                    onChange={this.handleDataChange}/>

                <label htmlFor="lat">Latitude</label>
                <input
                    type="text"
                    name="lat"
                    id="lat"
                    value={lat}
                    placeholder={"e.g. 51.498342"}
                    onChange={this.handleDataChange}/>

                <label htmlFor="lon">Longitude</label>
                <input
                    type="text"
                    name="lon"
                    id="lon"
                    value={lon}
                    placeholder={"e.g. -0.177002"}
                    onChange={this.handleDataChange}/>

                <input
                    type="button"
                    name="locB"
                    value="Use my location!"
                    onClick={this.grabLocation}/>

                <p style={{'border':'2px', 'border-style':'solid', 'border-color':'black','padding': '0.5em', 'margin':'1em'}}>
                    DISCLAIMER: this location data is only used to track where you found the dandelion seed to display it on the map below.
                Please write coordinates as numbers only (no need to write ° or W)</p>

                <label htmlFor="time">Time</label>
                <input
                    type="time"
                    name="time"
                    id="time"
                    value={time}
                    onChange={this.handleDataChange}/>

                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    name="date"
                    id="date"
                    value={date}
                    onChange={this.handleDataChange}/>

                <label htmlFor="img">Image</label>
                <input
                    accept="image/*"
                    type="file"
                    id="fileB"
                    capture="environment" //enable mobile external camera instead of file selection
                    onChange={this.handleImgChange}
                />

                <input
                    type="button"
                    value="SUBMIT"
                    onClick={this.submitForm}/>
            </form>
        )
    }
}