// based on tutorial from https://www.taniarascia.com/getting-started-with-react/

import React, {Component} from 'react'
import Table from './Table'
import Form from "./Form";

export default class App extends Component {
    //TODO add comments dawg
    // add references on copied Tania files

    state = {
        dData: [],
    }

    remove_dData = index => {
        const {dData} = this.state

        this.setState({
            dData: dData.filter((cdData, i) => {
                return i !== index;
            })
        });
    }

    handleSubmit = (cdData) => {
        this.setState({
            dData: [...this.state.dData, cdData],
          })
    }

    render() {
        const {dData} = this.state

        return (
            <div className="container">
                <h1 style={{textAlign: "center"}}>React-based User Input Webapp</h1>
                <h4 style={{textAlign: "center"}}>Dandelion Seed Mapping Project</h4>
                <p style={{textAlign: "center",}}>ZJORD, Imperial College 2021/22</p>


                <Table
                    dData={dData}
                    remove_dData={this.remove_dData} />
                <h3>Add new entry</h3>
                <Form
                    handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}