import React, { useContext } from "react";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { DataContext } from "../Context/DataStorage";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';






const RenderRowHandler = (props)=> {

  const {historyData,setFormData, setJsonText, setParamData, setHeaderData, setResponseData, setValidationText, setExpectedResponse, addRows, updateApi, setUpdateApi }= useContext(DataContext);
  const { index, style } = props;

  
  const clickHandler =() => {

    setFormData({ url: historyData[index].url, type: historyData[index].method});
    setJsonText( JSON.parse(historyData[index].body) );
    setHeaderData(JSON.parse(historyData[index].headers) );
    setValidationText( JSON.parse(historyData[index].validation));
    setExpectedResponse( JSON.parse(historyData[index].expectedRes));
    addRows( JSON.parse(historyData[index].row_num) );
    //addRows(oldArr => [...oldArr, historyData[index].row_num]);
    setUpdateApi({id: historyData[index].id, check: true});
    
  }

  const deleteHandler= async()=>{

    const response= await fetch(`http://localhost:8080/delete/${historyData[index].id}`, 
      {
         method: 'DELETE',
         headers: { "Content-Type": "application/json" }
      });
     
      
  }
  




  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={
        <span onClick={clickHandler} >
          <span style={{ color: '#286ac2', justifyContent:'center',alignItems:'center' }}>{historyData[index].method}</span>
          <span>{` ${historyData[index].url}`}</span>
           <DeleteOutlineOutlinedIcon style={{marginLeft: '12%' }} onClick={deleteHandler} />
        </span>
      } />
      </ListItemButton>
    </ListItem>
  );

}

export default RenderRowHandler;