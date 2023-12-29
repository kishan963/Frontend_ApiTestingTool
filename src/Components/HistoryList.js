import React from "react";
import RenderRowHandler from "./RenderRow";
import Box from '@mui/material/Box';
import { FixedSizeList } from 'react-window';
import ResponseHandler from "./Response";
import { Grid } from '@mui/material';
import CreateTab from './createTab';
import TestResultHandler from './TestResult';
import { useRef, useEffect, useContext } from "react";
import Home from "./Home";
import RouteHandler from "./route";
import { DataContext } from "../Context/DataStorage";
import Typography from '@mui/material/Typography';





const HistoryHandler = ()=>{
    const fullHeight = window.innerHeight;
    const fullWidth = window.innerWidth;

    const {historyData}= useContext(DataContext);
    
    return(
        <Grid container spacing={2}>
        <Grid item xs={3}>
            <div>
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
    </div>

          <div style={{display:"flex",position: 'fixed', marginTop: 60 }}>
          
            <FixedSizeList
              width={fullWidth/4}
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
        <div  >
        <Home />
          <RouteHandler />
     <CreateTab></CreateTab>
     
     <ResponseHandler></ResponseHandler>
     <TestResultHandler></TestResultHandler>
     </div>
        </Grid>
      </Grid>
    );

}

export default HistoryHandler;