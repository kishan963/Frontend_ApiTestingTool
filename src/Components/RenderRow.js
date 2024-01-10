import React, { useContext } from "react";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { DataContext } from "../Context/DataStorage";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { GetFromDatabase } from "./ApiCalls";


// Adding row to the history component.


const RenderRowHandler = (props)=> {

  const {historyData,setFormData, setJsonText, setHeaderData,setBackendData, setValidationText, setTestScript, addRows, setUpdateApi,setHistoryData,setApiDuration,setResponseLength,setResponseStatus,setResponseData }= useContext(DataContext);
  const { index, style } = props;

  // Populating data when clicked on any history api calls.
  const clickHandler =() => {

    setFormData({ url: historyData[index].url, type: historyData[index].method});
    setJsonText( JSON.parse(historyData[index].body) );
    setHeaderData(JSON.parse(historyData[index].headers) );
    setValidationText( JSON.parse(historyData[index].validation));
    setTestScript( JSON.parse(historyData[index].testScript));
    addRows( JSON.parse(historyData[index].row_num) );
    setBackendData([]);
    setApiDuration(0);
    setResponseData("");
    setResponseLength(0);
    setResponseStatus(200);
    //addRows(oldArr => [...oldArr, historyData[index].row_num]);
    setUpdateApi({id: historyData[index].id, check: true});
    
  }
  
  const deleteHandler= async()=>{

    const response= await fetch(`https://backend-api-testing-tool.onrender.com/delete/${historyData[index].id}`, 
      {
         method: 'DELETE',
         headers: { "Content-Type": "application/json" }
      });
     
     GetFromDatabase(setHistoryData) 
  }
  




  return (
    <ListItem style={style} key={index} component="div" disablePadding>
  <ListItemButton>
    <ListItemText primary={
      <div onClick={clickHandler} style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ color: '#286ac2' }}>{historyData[index].method}</span>
        <span style={{ paddingLeft: 5 }} >{` ${historyData[index].url.substring(0, 20)}`}</span>
        <div style={{ marginLeft: 'auto' }}>
          <DeleteOutlineOutlinedIcon onClick={deleteHandler} />
        </div>
      </div>
    } />
  </ListItemButton>
</ListItem>

  );

}

export default RenderRowHandler;