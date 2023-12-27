import React, { useContext } from "react";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { DataContext } from "../Context/DataStorage";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { GetFromDatabase } from "./ApiCalls";





const RenderRowHandler = (props)=> {

  const {historyData,setFormData, setJsonText, setHeaderData,setBackendData, setValidationText, setExpectedResponse, addRows, setUpdateApi,setHistoryData,setApiDuration,setResponseLength,setResponseStatus }= useContext(DataContext);
  const { index, style } = props;

  
  const clickHandler =() => {

    setFormData({ url: historyData[index].url, type: historyData[index].method});
    setJsonText( JSON.parse(historyData[index].body) );
    setHeaderData(JSON.parse(historyData[index].headers) );
    setValidationText( JSON.parse(historyData[index].validation));
    setExpectedResponse( JSON.parse(historyData[index].expectedRes));
    addRows( JSON.parse(historyData[index].row_num) );
    setBackendData([]);
    setApiDuration(0);
    setResponseLength(0);
    setResponseStatus(200);
    //addRows(oldArr => [...oldArr, historyData[index].row_num]);
    setUpdateApi({id: historyData[index].id, check: true});
    
  }

  const deleteHandler= async()=>{

    const response= await fetch(`http://localhost:8080/delete/${historyData[index].id}`, 
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
        <span>{` ${historyData[index].url.substring(0, 20)}`}</span>
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