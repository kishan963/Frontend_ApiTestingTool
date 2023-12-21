import React from "react";
import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { DataContext } from "../Context/DataStorage";
import {checkParams}  from "../Service/Validations"
import { getHeadersAndParams } from "../Service/Validations";
import ResponseHandler from "./Response";

 

const RouteHandler = ()=>{
    const options = ['GET', 'POST','PUT','DELETE'];
    const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');
   
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null)
    const [errorResponse, setErrorResponse] = useState(false);
    const [apiResponse, setApiResponse] = useState({})
   
    const {formData, setFormData, jsonText, headerData, setResponseData, setResponseStatus } = useContext(DataContext);
    const onSendClick=()=>{

        
        if(!checkParams(formData, jsonText, headerData, setErrorMsg)) {
            //setError(true);
            console.log(errorMsg);
            return false;
        }

         handleApiCall();
        

    }

    const handleApiCall= async() =>{
  
        
        const data = {
            method: formData.type,
            headers: getHeadersAndParams(headerData)
        }
        if(formData.type!='GET' )
        {
            data.body=jsonText;
        }
        const response= await fetch( formData.url,data);
        const resData= await response.json();
         setResponseData(resData);
         setResponseStatus(response.status)

    }


    return (  
<div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:'10px',gap:'10px'}}>
    <div>
        <Autocomplete 
      value={formData.type}
      onChange={(event, newValue) => {
        setFormData({ ...formData, type: newValue });
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo"
      options={options}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params}  />}
    />
    </div>
    <div> 
       
       <TextField value={formData.url} onChange={(e) => {
        setFormData({ ...formData, url: e.target.value });
      }} fullWidth label="URL" id="fullWidth" sx={{ width: '600px' }} />
       </div>

      <div>
      <Button variant="contained" size="large" onClick={onSendClick}>
      SEND
    </Button>
      </div>

       </div>
       
      );

}

export default RouteHandler;


{/* <Box className= 'pankaj'
        sx={{
          width: 500,
          maxWidth: '100%',
        }}
      >
        

        <Autocomplete 
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo"
      options={options}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params}  />}
    />
       
       <TextField fullWidth label="fullWidth" id="fullWidth" />

      </Box> */}