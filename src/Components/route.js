import React from "react";
import { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { DataContext } from "../Context/DataStorage";
import { checkParams } from "../Service/Validations";
import { getHeadersAndParams } from "../Service/Validations";
import ResponseHandler from "./Response";
import { GetFromDatabase } from "./ApiCalls";
import toast from "react-hot-toast";
import TestResultHandler from "./TestResult";
import ImportFileHandler from "./ImportFile";
import FileInputComponent from "./ImportFile";

// Handling the method, route and api calls to the api, backend testcase, database. 

const RouteHandler = () => {
  const options = ["GET", "POST", "PUT", "DELETE"];
  const [inputValue, setInputValue] = React.useState("");
  const [hasRunFunction, setHasRunFunction] = useState(false);

  useEffect(() => {
    GetFromDatabase(setHistoryData);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      GetFromDatabase(setHistoryData);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const {
    formData,
    setFormData,
    jsonText,
    backendData,
    headerData,
    validationText,
    paramData,
    rows,
    testScript,
    setHistoryData,
    setResponseData,
    setResponseStatus,
    setBackendData,
    updateApi,
    apiTestResult,
    setApiTestResult,
    setUpdateApi,
    setApiDuration,
    setResponseLength,
  } = useContext(DataContext);
  const onSendClick = () => {
    if (!checkParams(formData, jsonText, headerData, testScript)) {
      return false;
    }
    
    handleApiCall();

    if (updateApi.check) {
      UpdateData();
    } else SaveData();

    // setTimeout(() => {
    //   GetFromDatabase(setHistoryData);
    // }, 3000);
    

    

    //  setHistoryData( prevData => [...prevData,{ formData: formData,jsonText: jsonText,testScript: testScript }]);
  };

  const handleApiCall = async () => {
    // Making call to the api and my backend api service.
    let backendRes = [];
    let jsonResponse = null;
    let response = null;
    const data = {
      params: paramData,
      method: formData.type,
      headers: getHeadersAndParams(headerData),
    };
    if (formData.type != "GET") {
      data.body = jsonText;
    }

    try {
      const startTime = new Date();
      // Api call 
      response = await fetch(formData.url, data);
      jsonResponse = await response.json();
      const endTime = new Date();
      const duration = endTime - startTime;
      setApiDuration(duration);
      setResponseLength(JSON.stringify(jsonResponse).length);
      setResponseData(jsonResponse);
      setResponseStatus(response.status);
    } catch (error) {
      toast.error(error)
    }

    // Calling backend server to createTestCases.
    let expectedResParsed = {};
    //    if (testScript && testScript.trim() !== '') {
    //       expectedResParsed = JSON.parse(testScript);
    //  } else {
    //    expectedResParsed = {}; // or any default value that fits your use case
    //   }

    try {
      expectedResParsed = JSON.parse(testScript);
    } catch (error) {
       if(testScript.length>0)
       toast.error("TestScript Json is Invalid")
     
    }

    if (formData.type != "GET") {
      try {
        let BackendData;
       
         BackendData = {
          url: formData.url,
          method: formData.type,
          headers: getHeadersAndParams(headerData),
          body: JSON.parse(jsonText),
          validation: JSON.parse(validationText),
          expectedRes: expectedResParsed,
        };
        
        // Backend api call to get response for automated testcase and default testcase. 
        const BackendResponse = await fetch("http://localhost:8080/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(BackendData),
        });
        backendRes = await BackendResponse.json();
        
      } catch (error) {
        alert(error);
        return;
      }
    }
      setBackendData(backendRes);
     
    try {
      
      if( expectedResParsed!=undefined && expectedResParsed[0]!=undefined && expectedResParsed[0].testCondition!=undefined)
      UserTestCase(response,jsonResponse, backendRes, expectedResParsed);
      else if(testScript.length>0) {
        if( JSON.stringify(expectedResParsed)=== JSON.stringify(jsonResponse))
        { const updatedBackendRes = backendRes;
          const TestResult = {
            testRes: true,
            description: "Expected response",
          };
          updatedBackendRes.push(TestResult);
          setBackendData(updatedBackendRes);
        }else{
          const updatedBackendRes = backendRes;
          const TestResult = {
            testRes: false,
            description: "Expected response",
          };
          updatedBackendRes.push(TestResult);
          setBackendData(updatedBackendRes);
        }
        
      }
    } catch (error) {
      console.error("Error in Testscript " + error);
    }
  };



// User testcase is evaluated here
  const UserTestCase = (response, jsonResponse, backendRes, expectedResParsed) => {
    // const testCases = JSON.parse(testScript);
    const updatedBackendRes = backendRes; // Create a new array to store updated values
    expectedResParsed.forEach((testCase) => {
      const TestResult = {
        testRes: eval(testCase.testCondition),
        description: testCase.description,
      };
      updatedBackendRes.push(TestResult);
       // Push the new object into the updated array
    });
    
    // Update state once with the new array containing all test results
    setBackendData(updatedBackendRes);
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

  // Saving history to the database.
  const SaveData = async () => {
    const BackendData = {
      url: formData.url,
      method: formData.type,
      headers: JSON.stringify(headerData),
      body: JSON.stringify(jsonText),
      validation: JSON.stringify(validationText),
      testScript: JSON.stringify(testScript),
      row_num: JSON.stringify(rows),
    };

    const BackendResponse = await fetch("https://backend-api-testing-tool.onrender.com/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(BackendData),
    }).then((response) => response.json());
     setUpdateApi({ id: BackendResponse.id , check: true } )
  };

  // Updating the details of current api calls.
  const UpdateData = async () => {
    const BackendData = {
      url: formData.url,
      method: formData.type,
      headers: JSON.stringify(headerData),
      body: JSON.stringify(jsonText),
      validation: JSON.stringify(validationText),
      testScript: JSON.stringify(testScript),
      row_num: JSON.stringify(rows),
    };

    const BackendResponse = await fetch(
      `http://localhost:8080/update/${updateApi.id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(BackendData),
      }
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10px",
        gap: "10px",
      }}
    >
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
        <TextField
          value={formData.url}
          onChange={(e) => {
            setFormData({ ...formData, url: e.target.value });
          }}
          fullWidth
          label="URL"
          id="fullWidth"
          sx={{ width: "600px" }}
        />
      </div>

      <div>
        <Button variant="contained"  size="large" onClick={onSendClick} sx={{ width: "100px", height: "55px" }}>
          SEND
        </Button>
      </div>
    </div>
  );
};

export default RouteHandler;
