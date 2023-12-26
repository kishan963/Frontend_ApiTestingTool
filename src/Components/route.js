import React from "react";
import { useContext, useState, useEffect } from 'react';
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
   
    useEffect(() => {
      const interval = setInterval(() => {
        GetFromDatabase();
      }, 5000);
    
      // Clear interval on component unmount to avoid memory leaks
      return () => clearInterval(interval);
    }, []);
    
   
    const {formData, setFormData, jsonText, headerData,validationText, paramData,rows, expectedResponse, setHistoryData, setResponseData, setResponseStatus, setBackendData, updateApi } = useContext(DataContext);
    const onSendClick=()=>{

        
        if(!checkParams(formData, jsonText, headerData, expectedResponse)) {
            return false;
        }

         handleApiCall();
        
         console.log(updateApi.check);
          if(updateApi.check)
          {
             UpdateData();
          }
          else
          SaveData();

        //  setHistoryData( prevData => [...prevData,{ formData: formData,jsonText: jsonText,expectedResponse: expectedResponse }]);

    }

    const handleApiCall= async() =>{
  
        
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

    const GetFromDatabase = async()=>{

      const response= await fetch("http://localhost:8080/getAll", 
      {
         method: 'GET',
         headers: { "Content-Type": "application/json" }
      });
     
      
      const jsonResponse = await response.json();
      setHistoryData(jsonResponse);
      console.log(jsonResponse);

    }

    const SaveData = async()=>{
       
        const BackendData = {
            url: formData.url,
            method: formData.type,
            headers: JSON.stringify(headerData),
            body: JSON.stringify(jsonText),
            validation: JSON.stringify(validationText),
            expectedRes: JSON.stringify(expectedResponse),
            row_num: JSON.stringify(rows)
        }

        const BackendResponse= await fetch("http://localhost:8080/save", 
         {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(BackendData)
         });

    }

    const UpdateData = async()=>{
       
      const BackendData = {
          url: formData.url,
          method: formData.type,
          headers: JSON.stringify(headerData),
          body: JSON.stringify(jsonText),
          validation: JSON.stringify(validationText),
          expectedRes: JSON.stringify(expectedResponse),
          row_num: JSON.stringify(rows)
      }

      const BackendResponse= await fetch(`http://localhost:8080/update/${updateApi.id}`, 
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

