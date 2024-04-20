import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HangmanPage from './pages/HangmanPage';

const AllRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/hangman" element={<HangmanPage />} />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
