import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import { Button } from "@mui/material";
import AddJobPage from "./pages/AddJobPage/AddJobPage";
import AllJobsPage from "./pages/AllJobsPage/AllJobsPage"; // Import the AllJobsPage component
import ThemeContext from "./Theme/ThemeContext";

function App() {
  return (
    <Router>
      <ThemeContext>
        <Routes>
          <Route path="/" element={<AddJobPage />} />
          <Route path="/all-jobs" element={<AllJobsPage />} />{" "}
          {/* Route for all jobs page */}
        </Routes>
        <ShowAllJobsLink />
      </ThemeContext>
    </Router>
  );
}

function ShowAllJobsLink() {
  const location = useLocation();

  // Render the link only if the current pathname is not '/all-jobs'
  if (location.pathname !== "/all-jobs") {
    return (
      <Button
        variant="contained"
        style={{
          backgroundColor: "#f5f5f5",
          padding: "6px 24px",
          position: "fixed",
          top: "0",
          left: "0",
          margin: "16px",
          zIndex: "999",
          color: "black",
        }}
        component={Link}
        to="/all-jobs"
      >
        Show All Jobs
      </Button>
    );
  }

  return null;
}

export default App;
