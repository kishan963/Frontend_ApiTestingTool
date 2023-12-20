import React, { useState, useContext } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddRow from "./TableRow";
import Typography from '@mui/material/Typography';
import { DataContext } from "../Context/DataStorage";



function createData(name, calories) {
    return { name, calories};
  }
  
  const rows = [
    createData('Frozen yoghurt', 159),
    createData('Ice cream sandwich', 237)
  ];

const HeadersHandler= ()=>{
   
    const [rows, addRows]= useState([0]);
    const {headerData, setHeaderData} = useContext(DataContext);
     console.log(headerData);
    return(
          <div>
        <div><Typography mt={2} mb={2}>Headers</Typography></div>

        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

        <Table sx={{ width: '100%'  }} aria-label="simple table">
        <TableHead>
          <TableRow>

          <TableCell>Checkbox</TableCell>
            <TableCell>Key</TableCell>
            <TableCell >Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {
            rows.map((row,index)=> (

                     <AddRow
                     addRows={addRows}
                      rowId={index}
                      key={index}
                      data= {headerData}
                      setData= {setHeaderData}
                     />
                ))

             
          }

        </TableBody>
      </Table>

      </div>
      </div>
    );

}

export default HeadersHandler;