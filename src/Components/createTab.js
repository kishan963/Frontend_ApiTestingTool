import React from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import HeadersHandler from "./Headers";
import BodyHandler from "./Body";
import ParamsHandler from "./Params";
import TestHandler from "./TestTab";

const CreateTab= ()=> {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', minHeight: 350,  height: '100%', typography: 'body1' }}>
          <TabContext value={value} indicatorColor="secondary">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Params" value="1" />
                <Tab label="Headers" value="2" />
                <Tab label="Body" value="3" />
                <Tab label="Tests" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1"> <ParamsHandler/> </TabPanel>
            <TabPanel value="2"> <HeadersHandler></HeadersHandler> </TabPanel>
            <TabPanel value="3">  <BodyHandler/>  </TabPanel>
            <TabPanel value="4"><TestHandler/> </TabPanel>
          </TabContext>
        </Box>
      );

}
export default CreateTab;