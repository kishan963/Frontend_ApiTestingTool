import React, { useState } from "react";
import {TextareaAutosize } from '@mui/base/TextareaAutosize';
import Typography from '@mui/material/Typography';

const ResponseHandler=()=> {

    const storedBody = localStorage.getItem("response");
    const initialState = storedBody!=undefined ? storedBody : [];
    const [bodyData, setBodyData] = useState(initialState);
    
    //console.log( JSON.parse(bodyData) );

    return (
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <Typography mt={2} mb={2}>Response</Typography>
         <TextareaAutosize value={bodyData} style={{width: '77%',paddingLeft: 30, background: 'url(http://i.imgur.com/2cOaJ.png)',backgroundAttachment: 'local',backgroundRepeat: 'no-repeat'}} placeholder="Enter text" onChange={(e)=>{ setBodyData(e.target.value); localStorage.setItem("response",e.target.value);}} minRows={10} maxRows={30} />

        </div>
      ); 
}

export default ResponseHandler;