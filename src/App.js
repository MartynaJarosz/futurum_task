import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CampaignList from './CampaignList/CampaignList';
import CampaignForm from './CampaignForm/CampaignForm';
import ViewCampaign from './ViewCampaign/ViewCampaign';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CampaignList/>}></Route>
        <Route path="/campaign/form" element={<CampaignForm/>}></Route>
        <Route path="/campaign/form/:campaignId" element={<CampaignForm/>}></Route>
        <Route path="/campaign/view/:campaignId" element={<ViewCampaign/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
