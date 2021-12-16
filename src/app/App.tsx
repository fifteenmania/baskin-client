import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Calculator from '../feature/calculator/Calculator';
import SinglePlay from '../feature/singlePlay/SinglePlay';
import Multiplay from '../feature/multiPlay/Multiplay';

function Title() {
  return <Typography variant='h2' component="h2">
    베스킨라빈스 31 술게임 시뮬레이터
  </Typography>
}

function MainTab() {
  const [tabId, setTabId] = useState("calculator");
  const handleTabChange = (_: React.SyntheticEvent, newTabId: string) => {
    setTabId(newTabId);
  }
  return <div>
    <Tabs value={tabId} onChange={handleTabChange}>
      <Tab label="승률 계산기" value="calculator"/>
      <Tab label="싱글 플레이" value="single-play"/>
      <Tab label="멀티 플레이" value="multi-play"/>
    </Tabs>
    <TabPanel value={tabId} index={"calculator"}>
      <Calculator />
    </TabPanel>
    <TabPanel value={tabId} index={"single-play"}>
      <SinglePlay />
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
      <Title />
      <MainTab />
    </div>
  );
}

export default App;
