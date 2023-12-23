import React, { useState, useContext } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddRow from "./TableRow";
import Typography from '@mui/material/Typography';
import { DataContext } from "../Context/DataStorage";


const ParamsHandler= ()=>{
   
    
    const {paramData, setParamData,paramRows, addParamRows} = useContext(DataContext);
     
    return(
          <div>
        <div><Typography mt={2} mb={2}>Params</Typography></div>

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
            paramRows.map((row,index)=> (

                     <AddRow
                     addRows={addParamRows}
                      rowId={index}
                      key={index}
                      data= {paramData}
                      setData= {setParamData}
                     />
                ))

             
          }

        </TableBody>
      </Table>

      </div>
      </div>
    );

}

export default ParamsHandler;