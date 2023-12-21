import React, { useState, useContext } from "react";
import {TextareaAutosize } from '@mui/base/TextareaAutosize';
import Typography from '@mui/material/Typography';
import { DataContext } from "../Context/DataStorage";

const ResponseHandler=()=> {

    const storedBody = localStorage.getItem("response");
    
    const {responseData, responseStatus } = useContext(DataContext);

    return (
        
        
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <Typography mt={2} mb={2}>Response</Typography>
         <TextareaAutosize value={ JSON.stringify(responseData,null,"\t") } style={{width: '77%',paddingLeft: 30, background: 'url(http://i.imgur.com/2cOaJ.png)',backgroundAttachment: 'local',backgroundRepeat: 'no-repeat'}} placeholder="Response" readOnly minRows={10} maxRows={30} />
         
        <Typography mt={2} mb={2}>status={responseStatus}</Typography>
        
        </div>
        
        

      ); 
}

export default ResponseHandler;