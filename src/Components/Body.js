import React, { useState, useContext } from "react";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import Typography from '@mui/material/Typography';
import { DataContext } from "../Context/DataStorage";

const BodyHandler=()=> {
    
    const {jsonText, setJsonText, validationText, setValidationText } = useContext(DataContext);
    return (
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <Typography mt={2} mb={2}>JSON</Typography>
         <TextareaAutosize value={jsonText} spellCheck={false} style={{width: '80%',paddingLeft: 30, background: 'url(http://i.imgur.com/2cOaJ.png)',backgroundAttachment: 'local',backgroundRepeat: 'no-repeat'}} placeholder="Enter text" onChange={(e)=>{ setJsonText(e.target.value); }} minRows={10} maxRows={30} />
         <Typography mt={2} mb={2}>Validation</Typography>
         <TextareaAutosize value={validationText} spellCheck={false} style={{width: '80%',paddingLeft: 30, background: 'url(http://i.imgur.com/2cOaJ.png)',backgroundAttachment: 'local',backgroundRepeat: 'no-repeat'}} placeholder="Enter text" onChange={(e)=>{ setValidationText(e.target.value); }} minRows={10} maxRows={30} />

        </div>
      ); 
}

export default BodyHandler;