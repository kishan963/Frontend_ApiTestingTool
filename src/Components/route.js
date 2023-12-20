import React from "react";
import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { DataContext } from "../Context/DataStorage";

const RouteHandler = ()=>{
    const options = ['GET', 'POST','PUT','DELETE'];
    const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');
   
   
    const {formData, setFormData  } = useContext(DataContext);
    
    
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
       
       <TextField value={formData.url} onChange={(event, newValue) => {
        setFormData({ ...formData, url: newValue });
      }} fullWidth label="URL" id="fullWidth" sx={{ width: '600px' }} />
       </div>

      <div>
      <Button variant="contained" RUN>
      RUN
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