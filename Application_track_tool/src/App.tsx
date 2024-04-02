import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import AddJobPage from "./pages/AddJobPage/AddJobPage";
import AllJobsPage from "./pages/AllJobsPage/AllJobsPage"; // Import the AllJobsPage component
import ThemeContext from "./Theme/ThemeContext";

function App() {
  return (
    <Router>
      <ThemeContext>
        {/* Conditionally render the link based on the current pathname */}
        <ShowAllJobsLink />
        <Routes>
          <Route path="/" element={<AddJobPage />} />
          <Route path="/all-jobs" element={<AllJobsPage />} />{" "}
          {/* Route for all jobs page */}
        </Routes>
      </ThemeContext>
    </Router>
  );
}

function ShowAllJobsLink() {
  const location = useLocation();

  // Render the link only if the current pathname is not '/all-jobs'
  if (location.pathname !== "/all-jobs") {
    return <Link to="/all-jobs">Show All Jobs</Link>;
  }

  return null;
}

export default App;
