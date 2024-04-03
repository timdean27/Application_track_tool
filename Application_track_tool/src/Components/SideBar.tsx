import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Box } from "@mui/material";

function SideBar() {
  const location = useLocation();

  return (
    <Box
      bgcolor="#f5f5f5"
      width="200px" // Adjust the width as needed
      height="100vh"
      position="fixed"
      top="0"
      left="0"
      zIndex="999"
      borderRight="1px solid #ccc" // Add border to separate from content
      p="16px"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      {/* Show All Jobs button only if not on "/all-jobs" page */}
      {location.pathname !== "/all-jobs" && (
        <Button
          variant="contained"
          component={Link}
          to="/all-jobs"
          mb="8px"
          fullWidth
        >
          All Jobs
        </Button>
      )}
      {/* Add button for Add New Job page */}
      {location.pathname !== "/" && ( // Show only if not on Add New Job page
        <Button
          variant="contained"
          component={Link}
          to="/"
          mb="8px" 
          fullWidth 
        >
          Add New Job
        </Button>
      )}
      {/* Add more links here if needed */}
    </Box>
  );
}

export default SideBar;
