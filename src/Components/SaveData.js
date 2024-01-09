// import React from "react";
// import { DataContext } from "../Context/DataStorage";
// import { useContext, useState, useEffect } from "react";


// export const SaveData = async () => {

    
//     const {
//         formData,
//         setFormData,
//         jsonText,
//         backendData,
//         headerData,
//         validationText,
//         paramData,
//         rows,
//         testScript,
//         setHistoryData,
//         setResponseData,
//         setResponseStatus,
//         setBackendData,
//         updateApi,
//         apiTestResult,
//         setApiTestResult,
//         setUpdateApi,
//         setApiDuration,
//         setResponseLength,
//       } = useContext(DataContext);


//     console.log("Saving the api");
//     const BackendData = {
//       url: formData.url,
//       method: formData.type,
//       headers: JSON.stringify(headerData),
//       body: JSON.stringify(jsonText),
//       validation: JSON.stringify(validationText),
//       testScript: JSON.stringify(testScript),
//       row_num: JSON.stringify(rows),
//     };

//     const BackendResponse = await fetch("http://localhost:8080/save", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(BackendData),
//     }).then((response) => response.json());
//      setUpdateApi({ id: BackendResponse.id , check: true } )
     
//   };

 