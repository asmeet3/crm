// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ManageAudience from './ManageAudience';
import ViewAudience from './ViewAudience';
import SendCampaign from './SendCampaign';
import Navbar from './Navbar';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
        <Route path="/" element={<ManageAudience />} />
          <Route path="/ManageAudience" element={<ManageAudience />} />
          <Route path="/ViewAudience" element={<ViewAudience />} />
          <Route path="/SendCampaign" element={<SendCampaign />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
