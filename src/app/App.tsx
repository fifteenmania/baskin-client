import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import Calculator from '../feature/calculator/Calculator';
import SinglePlay from '../feature/singlePlay/SinglePlay';
import Multiplay from '../feature/multiPlay/Multiplay';

import 'typeface-roboto';
import './style.css';
import Footer from './Footer';
import HotSheet from '../feature/hotSheet/HotSheet';

function Title() {
  return <Typography variant='h3' component="h3">
    배스킨라빈스 31 웹게임
  </Typography>
}

function MainTab() {
  const [tabId, setTabId] = useState("calculator");
  const handleTabChange = (_: React.SyntheticEvent, newTabId: string) => {
    setTabId(newTabId);
  }
  return <div>
    <Tabs value={tabId} onChange={handleTabChange}>
      <Tab label="싱글 플레이" value="single-play"/>
      <Tab label="핫시트 플레이" value="hotsheet"/>
      <Tab label="멀티 플레이" value="multi-play"/>
      <Tab label="승률 계산기" value="calculator"/>
    </Tabs>
    <TabPanel value={tabId} index={"calculator"}>
      <Calculator />
    </TabPanel>
    <TabPanel value={tabId} index={"single-play"}>
      <SinglePlay />
    </TabPanel>
    <TabPanel value={tabId} index={"hotsheet"}>
      <HotSheet />
    </TabPanel>
    <TabPanel value={tabId} index={"multi-play"}>
      <Multiplay/>
    </TabPanel>
  </div>
}

function TabPanel(props: {value: string, index: string, children: JSX.Element}) {
  const {value, index, children, ...other} = props;
  return <div role="tabpanel" hidden={value !== index} id={index.toString()} {...other}>
    <Box sx={{p: 3}}>
      {children}
    </Box>
  </div>
}

function App() {
  return (
    <div className="App">
      <div className="page-wrapper">
        <Title />
        <MainTab />
      </div>
      <Footer />
    </div>
  );
}

export default App;
