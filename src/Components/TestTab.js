import React, { useState, useContext } from "react";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import Typography from '@mui/material/Typography';
import { DataContext } from "../Context/DataStorage";

const TestHandler=()=> {

    const {testScript, setTestScript} = useContext(DataContext);
    console.log(testScript);
    return (
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <Typography mt={2} mb={2}>Testcase Script / Expected Response</Typography>
         <TextareaAutosize value={testScript} spellCheck={false} style={{ width: '80%',paddingLeft: 30, background: 'url(http://i.imgur.com/2cOaJ.png)',backgroundAttachment: 'local',backgroundRepeat: 'no-repeat'}} placeholder="Enter text" onChange={(e)=>{ setTestScript(e.target.value); }} minRows={10} maxRows={30} />
        </div>
      ); 
}

export default TestHandler;