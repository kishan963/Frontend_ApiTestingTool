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
import { GetFromDatabase } from "./ApiCalls";

 

const RouteHandler = ()=>{
    const options = ['GET', 'POST','PUT','DELETE'];
    const [inputValue, setInputValue] = React.useState('');
    const [hasRunFunction, setHasRunFunction] = useState(false);
   
    useEffect(() => {
         GetFromDatabase(setHistoryData);
       
    }, []);
    
   
    const {formData, setFormData, jsonText,backendData, headerData,validationText, paramData,rows, expectedResponse, setHistoryData, setResponseData, setResponseStatus, setBackendData, updateApi, apiTestResult, setApiTestResult, setApiDuration,setResponseLength } = useContext(DataContext);
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
          
          setTimeout(() => {
            
              GetFromDatabase(setHistoryData);
            
          }, 3000);
          


        //  setHistoryData( prevData => [...prevData,{ formData: formData,jsonText: jsonText,expectedResponse: expectedResponse }]);

    }

    const handleApiCall= async() =>{
  
      // Making call to the api.
      let backendRes=[];
      let jsonResponse=null;
        const data = {
            params: paramData,
            method: formData.type,
            headers: getHeadersAndParams(headerData)
        }
        if(formData.type!='GET' )
        {
            data.body=jsonText;
           
        }

        try{
          const startTime = new Date();
        const response= await fetch( formData.url,data);
        jsonResponse= await response.json();
        const endTime = new Date();
        const duration = endTime - startTime;
        setApiDuration(duration);
        setResponseLength(JSON.stringify(jsonResponse).length );
         setResponseData(jsonResponse);
         setResponseStatus(response.status)
        } catch (error){
          alert(error);
        }
         

       
        
         // Calling backend server to createTestCases.
        let expectedResParsed;
           if (expectedResponse && expectedResponse.trim() !== '') {
         expectedResParsed = JSON.parse(expectedResponse);
         } else {
           expectedResParsed = {}; // or any default value that fits your use case
          }

        if(formData.type!='GET'){
          const BackendData = {
              url: formData.url,
              method: formData.type,
              headers: getHeadersAndParams(headerData),
              body: JSON.parse(jsonText),
              validation: JSON.parse(validationText),
              expectedRes: expectedResParsed
          }

          try{
          const BackendResponse= await fetch("http://localhost:8080/create", 
           {
              method: 'POST',
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(BackendData)
           }
  
          );
           backendRes= await BackendResponse.json();
           setBackendData(backendRes);
           } catch (error){
            alert(error);
           }


          }


         

         if (expectedResponse && expectedResponse.trim() !== '' && jsonResponse!=null) {
           UserTestCase(jsonResponse, backendRes);
          }
         
         
        

    }

    const UserTestCase = (jsonResponse, backendRes) => {
      const testCases = JSON.parse(expectedResponse);
      const updatedBackendRes = backendRes; // Create a new array to store updated values
    
      testCases.forEach(testCase => {
        const TestResult = {
          testRes: eval(testCase.testCondition),
          description: testCase.description
        };
        updatedBackendRes.push(TestResult);
        console.log(updatedBackendRes); // Push the new object into the updated array
      });
       console.log(backendRes);
       console.log(updatedBackendRes);
      // Update state once with the new array containing all test results
      setBackendData(updatedBackendRes);
      console.log(backendData);
    }; 

    // const GetFromDatabase = async()=>{

    //   const response= await fetch("http://localhost:8080/getAll", 
    //   {
    //      method: 'GET',
    //      headers: { "Content-Type": "application/json" }
    //   });
     
      
    //   const jsonResponse = await response.json();
    //   setHistoryData(jsonResponse);
      

    // }

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

