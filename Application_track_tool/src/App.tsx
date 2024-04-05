
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddJobPage from "./pages/AddJobPage/AddJobPage";
import AllJobsPage from "./pages/AllJobsPage/AllJobsPage";
import ThemeContext from "./Theme/ThemeContext";
import SideBar from "./Components/SideBar";

function App() {
  return (
    <Router>
      <ThemeContext>
        <div style={{ display: "flex" }}>
          {/* Render the sidebar */}
          <SideBar />
          {/* Define a container for the content area */}
          <div style={{ marginLeft: "200px", flexGrow: 1 }}>
            {/* Wrap Routes inside a Routes element */}
            <Routes>
              {/* Define routes */}
              <Route path="/" element={<AddJobPage />} />
              <Route path="/all-jobs" element={<AllJobsPage />} />
            </Routes>
          </div>
        </div>
      </ThemeContext>
    </Router>
  );
}

export default App;
