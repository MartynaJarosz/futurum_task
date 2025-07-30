import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CampaignList from './CampaignList';
import CampaignForm from './CampaignForm';
import ViewCampaign from './ViewCampaign';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<CampaignList/>}></Route>
      <Route path="/campaign/form" element={<CampaignForm/>}></Route>
      <Route path="/campaign/form/:campaignid" element={<CampaignForm/>}></Route>
      <Route path="/campaign/view/:campaignid" element={<ViewCampaign/>}></Route>


    </Routes>
    </BrowserRouter>
  );
}

export default App;
