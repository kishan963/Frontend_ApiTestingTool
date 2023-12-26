import React, { useContext } from "react";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { DataContext } from "../Context/DataStorage";




const RenderRowHandler = (props)=> {

  const {historyData}= useContext(DataContext);
  const { index, style } = props;
  const {url ,type}= historyData[index].formData;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={
        <span>
          <span style={{ color: '#286ac2' }}>{type}</span>
          <span>{` ${url}`}</span>
        </span>
      } />
      </ListItemButton>
    </ListItem>
  );

}

export default RenderRowHandler;