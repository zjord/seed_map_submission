// // based on tutorial from https://www.taniarascia.com/getting-started-with-react/
// import React, {Component} from "react";
//
// export default class Form extends Component { // Form: class component
//
// 	initialState = {
//         col: '',
//         coords: {
// 			lat: '',
// 			lon: '',
// 		},
//         img: '',
//     }
//
// 	state = this.initialState;
//
//     handleDataChange = e => {
//         const {name, value} = e.target
//         this.setState({
//             [name]: value,
//         })
//     }
//
//     handleImgChange = e => {
//         const img = e.target.files[0]
//         console.log(img)
//         this.setState({
//             img: img,
//         })
//     }
//
//     handleKeypress = e => {
//         if (e.keyCode === 13){
//             this.submitForm()
//             console.log("enter pressed")
//         }
//         console.log("key_press")
//     }
//
//     componentDidMount() {
//         navigator.geolocation.getCurrentPosition(
//             // function(position) {
//             //     console.log(position.coords)
//             // },
//
//             // very wishy-washi way of slapping coordinates into form
//             success => this.setState({coords.lat: success.coords.latitude,coords.lon: success.coords.longitude,}),
//
//             function(error) {
//                 console.error("Error Code = " + error.code + " - " + error.message);
//             }
//         );
//         // at this point, state = ''
//     }
//
//     submitForm = () => {
//         //TODO automize empty data handling for all states
//         if ( (this.state.col && this.state.(coords.lat) && this.state.(coords.lon) && this.state.img ) === '' ){
//             alert("empty form box! :(")
//         }
//         else {
// 			this.props.handleSubmit(this.state);
// 			accessSpreadsheet();
// 		}
//
//         this.setState(this.initialState) // clears form
//         document.getElementById('fileB').value= null; // resets fileButton text to "No file chosen"
//     }
//
//     render() {
//         const {col, coords.lat, coords.lon} = this.state; //img unused
//
//         return (
//             <form>
//                 <label htmlFor="col">Colour</label>
//                 <input
//                     type="text"
//                     name="col"
//                     id="col"
//                     value={col}
//                     onChange={this.handleDataChange}
//                     onKeyDown={this.handleKeypress}
// 					/>
//                 <label htmlFor="lat">Latitude</label>
//                 <input
//                     type="text"
//                     name="lat"
//                     id="lat"
//                     value={coords.lat}
//                     onChange={this.handleDataChange}
//                     onKeyDown={this.handleKeypress}/>
//                 <label htmlFor="lon">Longitude</label>
//                 <input
//                     type="text"
//                     name="lon"
//                     id="lon"
//                     value={coords.lon}
//                     onChange={this.handleDataChange}
//                     onKeyDown={this.handleKeypress}/>
//                 <label htmlFor="img">Image</label>
//                 <input
//                     accept="image/*"
//                     type="file"
//                     id="fileB"
//                     onChange={this.handleImgChange}/>
//                 <button
//                     type="button"
//                     onClick={this.submitForm}
// 				>
// 					Submit
// 				</button>
//
//
//             </form>
//         )
//     }
// }