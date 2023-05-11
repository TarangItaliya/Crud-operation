import React from 'react'
// import {state} from "state"
import logo from "./logo.svg";

import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";



const Table2 = () => {

   


     const getDataFromApi = () => {
        fetch('https://example.com/api/data')
          .then(response => response.json())
          .then(data => this.setState({ data }))
      }


     

     const handleOpenDialog = (item) => {
        this.setState({
          showDialog: true,
          dialogData: item,
          // other state variables
        })
      }


     const handleSubmit = (event) => {
        event.preventDefault()
        const updatedData = {
          id: this.props.dialogData
        }
    }
  
    // render() {
  return (
    <>
    <table>
      <thead>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(item => (
          <tr key={item.id}>
            <td>{item.column1}</td>
            <td>{item.column2}</td>
            <td>{item.column3}</td>
            <td>
              <button onClick={() => this.handleOpenDialog(item)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>


    <Dialog open={this.props.showDialog} onClose={this.props.handleCloseDialog}>
  <DialogContent>
    <form onSubmit={this.handleSubmit}>
      <input type="text" name="column1" value={this.props.dialogData.column1} onChange={this.handleChange} />
      <input type="text" name="column2" value={this.props.dialogData.column2} onChange={this.handleChange} />
      <input type="text" name="column3" value={this.props.dialogData.column3} onChange={this.handleChange} />
      <button type="submit">Save</button>
    </form>
  </DialogContent>
</Dialog>

    </>
  )
// }

}

export default Table2;