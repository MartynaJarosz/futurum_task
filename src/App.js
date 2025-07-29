import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CampaignList from './CampaignList';
import CreateCampaign from './CreateCampaign';
import EditCampaign from './EditCampaign';
import ViewCampaign from './ViewCampaign';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<CampaignList/>}></Route>
      <Route path="/campaign/create" element={<CreateCampaign/>}></Route>
      <Route path="/campaign/edit/:campaignid" element={<EditCampaign/>}></Route>
      <Route path="/campaign/view/:campaignid" element={<ViewCampaign/>}></Route>


    </Routes>
    </BrowserRouter>
  );
}

export default App;
