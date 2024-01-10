import React from "react";
import RenderRowHandler from "./RenderRow";
import Box from "@mui/material/Box";
import { FixedSizeList } from "react-window";
import ResponseHandler from "./Response";
import { Grid } from "@mui/material";
import CreateTab from "./createTab";
import TestResultHandler from "./TestResult";
import { useRef, useEffect, useContext } from "react";
import Home from "./Home";
import RouteHandler from "./route";
import { DataContext } from "../Context/DataStorage";
import Typography from "@mui/material/Typography";
import FileInputComponent from "./ImportFile";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";





const HistoryHandler = () => {
  const fullHeight = window.innerHeight;
  const fullWidth = window.innerWidth;
  const fileInputRef = useRef(null);
  const {historyData,formData, jsonText,setJsonText,setTestScript, setHeaderData,setValidationText, setFormData, headerData,backendData, validationText, testScript, rows,addRows, setUpdateApi,setHistoryData,setApiDuration,setResponseLength,setResponseStatus,setResponseData }= useContext(DataContext); 

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onload = function (event) {
  //       const fileContents = event.target.result;
  //       const jsonFileContents= JSON.parse(fileContents);
        
  //       setFormData({url: jsonFileContents.url,type: jsonFileContents.method});
  //       setJsonText(jsonFileContents.body);
  //       setHeaderData(jsonFileContents.headers);
  //       setValidationText(jsonFileContents.validation);
  //       setTestScript(jsonFileContents.testScript);
  //       addRows(jsonFileContents.row_num);
  //       console.log("dsdfghjklkjh");
  //       SaveData();

  //     };

  //     reader.readAsText(file); 
  //     console.log(reader);
  //   }

    
  //   // Handle the selected file here...
  // };


  // const SaveData = async () => {

  //   // const {
  //   //     formData,
  //   //     setFormData,
  //   //     jsonText,
  //   //     backendData,
  //   //     headerData,
  //   //     validationText,
  //   //     paramData,
  //   //     rows,
  //   //     testScript,
  //   //     setHistoryData,
  //   //     setResponseData,
  //   //     setResponseStatus,
  //   //     setBackendData,
  //   //     updateApi,
  //   //     apiTestResult,
  //   //     setApiTestResult,
  //   //     setUpdateApi,
  //   //     setApiDuration,
  //   //     setResponseLength,
  //   //   } = useContext(DataContext);



  //   console.log("Saving the api");
  //   const BackendData = {
  //     url: formData.url,
  //     method: formData.type,
  //     headers: JSON.stringify(headerData),
  //     body: JSON.stringify(jsonText),
  //     validation: JSON.stringify(validationText),
  //     testScript: JSON.stringify(testScript),
  //     row_num: JSON.stringify(rows),
  //   };

  //   const BackendResponse = await fetch("http://localhost:8080/save", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(BackendData),
  //   }).then((response) => response.json());
  //    setUpdateApi({ id: BackendResponse.id , check: true } )
     
  // };



  const saveData = async (url,type, headers, body, validation, testScript, rows, setUpdateApi) => {
    // Your save logic here, avoid using hooks inside this function
    console.log("Saving the api");
    const BackendData = {
      url: url,
      method: type,
      headers: JSON.stringify(headers),
      body: JSON.stringify(body),
      validation: JSON.stringify(validation),
      testScript: JSON.stringify(testScript),
      row_num: JSON.stringify(rows),
    };
  
    const BackendResponse = await fetch("https://backend-api-testing-tool.onrender.com/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(BackendData),
    }).then((response) => response.json());
    
    setUpdateApi({ id: BackendResponse.id , check: true });
  };
  
  // In your HistoryHandler component
  const handleFileChange = async (event) => {
    console.log("Import File change");
    // ... (your existing code)
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
  
      reader.onload = function (event) {
        const fileContents = event.target.result;
        const jsonFileContents= JSON.parse(fileContents);
  
        // Pass required values to saveData function
        saveData(
          jsonFileContents.url,
          jsonFileContents.method,
          jsonFileContents.headers,
          jsonFileContents.body,
          jsonFileContents.validation,
          jsonFileContents.testScript,
          jsonFileContents.row_num,
          setUpdateApi // Pass the setUpdateApi function
        );
      };
      event.target.value = null;
      reader.readAsText(file);
    }
  };
  






  const handleExportClick = () => {
    // Prepare data for export (example data)
    console.log(formData.type);
    const dataToExport = { 
          url:  formData.url,
          method: formData.type,
          headers: headerData,
          body: jsonText ,
          validation: validationText,
          testScript: testScript,
          row_num: rows
    };
    

    // Create a Blob with text content
    const blob = new Blob([JSON.stringify(dataToExport)], { type: 'application/json;charset=utf-8;' });

    // Create a temporary link element to trigger the download
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'data.txt');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
 

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        {/* <div>
        <Typography
      mt={2}
      mb={2}
      sx={{
        width: '24%',
        backgroundColor: '#286ac2',
        padding: '10px', 
        borderRadius: '5px', 
        color: 'white',
        position: 'fixed'
      }}
    >
      History
    </Typography>
    <FileInputComponent/>
    </div> */}

        <Box sx={{ flexGrow: 1, width: '25%' , position: 'fixed' }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              ></IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, marginLeft: "-25px" }}
              >
                History
              </Typography>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <Button  onClick={handleImportClick} color="inherit">Import</Button>
              
              <Button onClick={handleExportClick} color="inherit">Export</Button>
            </Toolbar>
          </AppBar>
        </Box>

        <div style={{ display: "flex", position: "fixed", marginTop: 65 }}>
          <FixedSizeList
            width={fullWidth / 4}
            height={fullHeight}
            itemSize={46}
            itemCount={historyData.length}
            overscanCount={10}
          >
            {RenderRowHandler}
          </FixedSizeList>
        </div>
      </Grid>
      <Grid item xs={9}>
        <div>
          <Home />
          <RouteHandler />
          <CreateTab></CreateTab>

          <ResponseHandler></ResponseHandler>
          <TestResultHandler></TestResultHandler>
        </div>
      </Grid>
    </Grid>
  );
};

export default HistoryHandler;
