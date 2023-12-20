import React, { useState } from "react";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import Typography from '@mui/material/Typography';

const BodyHandler=()=> {

    const storedBody = localStorage.getItem("body");
    const initialState = storedBody!=undefined ? storedBody : [];
    const [bodyData, setBodyData] = useState(initialState);
    
    //console.log( JSON.parse(bodyData) );

    return (
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <Typography mt={2} mb={2}>JSON</Typography>
         <TextareaAutosize value={bodyData} style={{width: '80%',paddingLeft: 30, background: 'url(http://i.imgur.com/2cOaJ.png)',backgroundAttachment: 'local',backgroundRepeat: 'no-repeat'}} placeholder="Enter text" onChange={(e)=>{ setBodyData(e.target.value); localStorage.setItem("body",e.target.value);}} minRows={10} maxRows={30} />

        </div>
      ); 
}

export default BodyHandler;