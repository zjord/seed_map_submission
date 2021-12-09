import React, {Component} from 'react'

const TableHeader = () => {
    return(
        <thead>
        <tr>
            <th>Name</th>
            <th>Job</th>
            <th>Image</th>
            <th>Delete row</th>
        </tr>
        </thead>
    )
}
const TableBody = (props) => {
    const rows = props.characterData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.job}</td>
                <td><img src={URL.createObjectURL(row.imgurl)} alt="ImgSubmission" height={100}/></td>
                <td>
                    <button onClick={() => props.removeCharacter(index)}>X</button>
                </td>
            </tr>
        );
    })
    return <tbody>{rows}</tbody>
}
const Table = (props) => {
    const {characterData, removeCharacter} = props

    return (
        <table>
            <TableHeader />
            <TableBody characterData={characterData} removeCharacter={removeCharacter} />
        </table>
    )
}

export default Table