import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from '@mui/material/Checkbox';
import { TextField } from "@mui/material";

const AddRow = ({addRows, rowId, data, setData}) => {

 const [isChecked,setCheckBox]= useState(false);

 const handleChange=(e)=>{
     
    let result = data.filter(entry => entry.id === Number(e.target.name))[0];
        
        if (!isChecked) {
            setCheckBox(true);
            addRows(oldArr => [...oldArr, rowId]);
            result = { ...result, id: rowId, check: true }
        } else {
            setCheckBox(false);
            result = { ...result, id: rowId, check: false }
        }
        
        let index = data.findIndex((value) => value.id === Number(e.target.name));
        if (index === -1) {
            setData(oldArr => [...oldArr, result]);
        } else {
            const newArray = Object.assign([...data], {
                [index]: result
            });
            setData(newArray)    
        }
 }

 const handleTextChange = (e)=>{

    let result = data.filter(entry => entry.id === rowId)[0];
        result = { ...result, id: rowId, [e.target.name]: e.target.value }

        let index = data.findIndex((value) => value.id === rowId);
        
        if (index === -1) {
            setData(oldArr => [...oldArr, result]);
        } else {
            const newArray = Object.assign([...data], {
                [index]: result
            });
            setData(newArray)    
        }

 }

  return (
    <TableRow>
        <TableCell > 
            <Checkbox
               checked={isChecked}
               name={rowId}
               onChange={(e)=>handleChange(e)}
            >
             </Checkbox> 
              </TableCell>
      <TableCell component="th" scope="row"><TextField  inputProps={{ style: {height: 15 } }} name="key" onChange={(e)=> handleTextChange(e)} /> </TableCell>
      <TableCell > <TextField inputProps={{ style: {height: 15} }} name="value" onChange={(e)=> handleTextChange(e)}  /> </TableCell>
    </TableRow>

    
  );
};

export default AddRow;
