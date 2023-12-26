import React, { useContext, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DataContext } from "../Context/DataStorage";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';


const TestResultHandler= ()=> {

    const {backendData}= useContext(DataContext);
   useEffect(()=>{

   },[backendData])

    return(
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}} > 
        
      <Table sx={{ width: '82%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>TestCase (passed)</TableCell>
            <TableCell align="right">description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {backendData.map((row) => ( 
            
            <TableRow
              key={row.testRes}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                { row.testRes? <CheckCircleOutlineIcon/>: <CancelIcon/> }
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    

    </div>

    );

}
export default TestResultHandler;