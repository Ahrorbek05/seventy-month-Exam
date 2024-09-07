import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryHome from './pages/CountryHome';
import CountryDetails from './pages/CountryDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountryHome />} />
        <Route path="/country/:slug" element={<CountryDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
