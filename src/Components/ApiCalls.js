import React, { useContext } from "react";


export const GetFromDatabase = async(setHistoryData)=>{
    
    const response= await fetch("https://backend-api-testing-tool.onrender.com/getAll", 
    {
       method: 'GET',
       headers: { "Content-Type": "application/json" }
    });
   
    
    const jsonResponse = await response.json();
    setHistoryData(jsonResponse);
    console.log(jsonResponse);
    

  }