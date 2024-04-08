import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

interface FilterOptions {
  sortByDate: string;
  showDeclined: boolean;
  company: string;
}

interface FilterCompProps {
  filterOptions: FilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
}

const FilterComp: React.FC<FilterCompProps> = ({
  filterOptions,
  setFilterOptions,
}) => {
  const [company, setCompany] = useState("");

  const handleSearch = () => {
    setFilterOptions({ ...filterOptions, company: company.trim() }); // Update company in filterOptions
  };

  const handleClear = () => {
    setCompany("");
    setFilterOptions({ ...filterOptions, company: "" }); // Clear company in filterOptions
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <TextField
        label="Search by Company Name"
        variant="outlined"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        style={{ marginRight: "16px" }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
      <Button variant="contained" color="secondary" onClick={handleClear}>
        Clear
      </Button>
    </Box>
  );
};

export default FilterComp;

