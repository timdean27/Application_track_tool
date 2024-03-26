import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddJobPage from './pages/AddJobPage/AddJobPage';
import AllJobsPage from './pages/AllJobsPage/AllJobsPage'; // Import the AllJobsPage component
import ThemeContext from './Theme/ThemeContext';

function App() {
  return (
    <Router>
      <ThemeContext>
        <Routes>
          <Route path="/" element={<AddJobPage />} />
          <Route path="/all-jobs" element={<AllJobsPage />} /> {/* Route for all jobs page */}
        </Routes>
        <Link to="/all-jobs">Show All Jobs</Link> {/* Link to the all jobs page */}
      </ThemeContext>
    </Router>
  );
}

export default App;
