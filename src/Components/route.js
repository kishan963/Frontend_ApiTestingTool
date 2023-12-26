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
    const [inputValue, setInputValue] = React.useState('');
   
    
   
    const {formData, setFormData, jsonText, headerData,validationText, paramData, expectedResponse, setHistoryData, setResponseData, setResponseStatus, setBackendData } = useContext(DataContext);
    const onSendClick=()=>{

        
        if(!checkParams(formData, jsonText, headerData, expectedResponse)) {
            return false;
        }

         handleApiCall();
        
         setHistoryData( prevData => [...prevData,{ formData: formData,jsonText: jsonText,expectedResponse: expectedResponse }]);

    }

    const handleApiCall= async() =>{
  
        SaveData();
        const data = {
            params: paramData,
            method: formData.type,
            headers: getHeadersAndParams(headerData)
        }
        if(formData.type!='GET' )
        {
            data.body=jsonText;
           
        }
        const response= await fetch( formData.url,data);

        if(formData.type!='GET'){
        const BackendData = {
            url: formData.url,
            method: formData.type,
            headers: getHeadersAndParams(headerData),
            body: JSON.parse(jsonText),
            validation: JSON.parse(validationText),
            expectedRes: JSON.parse(expectedResponse)
        }

        const BackendResponse= await fetch("http://localhost:8080/create", 
         {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(BackendData)
         }

        );
        const backendRes= await BackendResponse.json();
         console.log(backendRes[0].description)
         setBackendData(backendRes);
         console.log(backendRes);
         } 
         const resData= await response.json();
         setResponseData(resData);
         setResponseStatus(response.status)

    }

    const SaveData = async()=>{
       
        const BackendData = {
            url: formData.url,
            method: formData.type,
            headers: JSON.stringify(getHeadersAndParams(headerData)),
            body: JSON.stringify(jsonText),
            validation: JSON.stringify(validationText),
            expectedRes: JSON.stringify(expectedResponse)
        }

        const BackendResponse= await fetch("http://localhost:8080/save", 
         {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(BackendData)
         });

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
      freeSolo 
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} />}
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

