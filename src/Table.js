// based on tutorial from https://www.taniarascia.com/getting-started-with-react/
import React from 'react'

const TableHeader = () => { // Table: functional components
    return(
        <thead>
        <tr>
            <th>Colour</th>
            <th>Location</th>
            <th>Image</th>
            <th>Delete row</th>
        </tr>
        </thead>
    )
}
const TableBody = (props) => {
    const rows = props.dData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.col}</td>
                <td>{row.loc}</td>
                <td><img src={URL.createObjectURL(row.img)} alt="ImgSubmission" height={100}/></td>
                <td>
                    <button onClick={() => props.remove_dData(index)}>X</button>
                </td>
            </tr>
        );
    })
    return <tbody>{rows}</tbody>
}
const Table = (props) => {
    const {dData, remove_dData} = props

    return (
        <table>
            <TableHeader />
            <TableBody dData={dData} remove_dData={remove_dData} />
        </table>
    )
}

// const ("state" less components) need to be declared and exported afterwards
export default Table