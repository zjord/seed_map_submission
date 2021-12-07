import React, {Component} from "react";

class Form extends Component {
    initialState = {
        name: '',
        job: '',
    }

    state = this.initialState

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value,
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
        this.props.handleSubmit(this.state)
        this.setState(this.initialState)
    }

    render() {
        const {name, job} = this.state;

        return (
            <form>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeypress}/>
                <label htmlFor="job">Job</label>
                <input
                    type="text"
                    name="job"
                    id="job"
                    value={job}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeypress}/>
                <input
                    type="button"
                    value="Submit"
                    onClick={this.submitForm} />
            </form>
        )
    }
}
export default Form