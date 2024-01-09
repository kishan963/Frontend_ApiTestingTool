import React, { useContext } from "react";


export const GetFromDatabase = async(setHistoryData)=>{
    
    const response= await fetch("http://localhost:8080/getAll", 
    {
       method: 'GET',
       headers: { "Content-Type": "application/json" }
    });
   
    
    const jsonResponse = await response.json();
    setHistoryData(jsonResponse);
    console.log(jsonResponse);
    

  }