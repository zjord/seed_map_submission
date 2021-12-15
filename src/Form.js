// based on tutorial from https://www.taniarascia.com/getting-started-with-react/
import React, {Component} from "react";

export default class Form extends Component { // Form: class component
    initialState = {
        col: '',
        loc: '',
        img:'',
    }
    state = this.initialState

    handleDataChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value,
        })
    }

    handleImgChange = (event) => {
        const img = event.target.files[0]
        console.log(img)
        this.setState({
            img: img,
        })
    }

    handleKeypress = e => {
        if (e.keyCode === 13){
            this.submitForm()
            console.log("enter pressed")
        }
        console.log("key_press")
    }

    submitForm = () => {
        // console.log(this.state)
        //TODO automize empty data handling for all states
        if ( (this.state.col && this.state.loc && this.state.img ) === '' ){
            alert("empty form box! :(")
        } else { this.props.handleSubmit(this.state) }

        this.setState(this.initialState) // clears form
        document.getElementById('fileB').value= null; // resets fileButton text to "No file chosen"

    }

    render() {
        const {col, loc} = this.state; //img unused

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
                <label htmlFor="loc">Location</label>
                <input
                    type="text"
                    name="loc"
                    id="loc"
                    value={loc}
                    onChange={this.handleDataChange}
                    onKeyDown={this.handleKeypress}/>
                <input
                    accept="image/*"
                    type="file"
                    id="fileB"
                    onChange={this.handleImgChange}/>
                <input
                    type="button"
                    value="Submit"
                    onClick={this.submitForm}/>
            </form>
        )
    }
}