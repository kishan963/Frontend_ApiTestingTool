import React from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import HeadersHandler from "./Headers";
import BodyHandler from "./Body";

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
                <Tab label="Headers" value="1" />
                <Tab label="Body" value="2" />
                <Tab label="Tests" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1"> <HeadersHandler></HeadersHandler> </TabPanel>
            <TabPanel value="2">  <BodyHandler/>  </TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
        </Box>
      );

}
export default CreateTab;