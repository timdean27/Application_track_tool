import React, { useState } from "react";
import { TextField, Button, Box, FormControlLabel, Checkbox, Select, MenuItem, InputLabel } from "@mui/material";

interface FilterOptions {
  sortByDate: string;
  showDeclined: boolean;
  showEmptyAppliedDate: boolean;
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
  const [sortByDate, setSortByDate] = useState("");

  const handleSearch = () => {
    setFilterOptions({ ...filterOptions, company: company.trim() }); // Update company in filterOptions
  };

  const handleClear = () => {
    setCompany("");
    setFilterOptions({ ...filterOptions, company: "" }); // Clear company in filterOptions
  };

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortByDate(event.target.value as string);
    setFilterOptions({ ...filterOptions, sortByDate: event.target.value as string });
  };

  const handleShowDeclinedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions({ ...filterOptions, showDeclined: !event.target.checked });
  };

  const handleShowEmptyAppliedDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions({ ...filterOptions, showEmptyAppliedDate: !event.target.checked });
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
      <InputLabel htmlFor="sort-by-date">Sort by Date:</InputLabel>
      <Select
        id="sort-by-date"
        value={sortByDate}
        onChange={() => handleSortChange}
        style={{ marginRight: "16px", marginLeft: "8px" }}
      >
        <MenuItem value="">None</MenuItem>
        <MenuItem value="asc">Ascending</MenuItem>
        <MenuItem value="desc">Descending</MenuItem>
      </Select>
      <FormControlLabel
        control={
          <Checkbox
            checked={!filterOptions.showDeclined}
            onChange={handleShowDeclinedChange}
            color="primary"
          />
        }
        label="Hide Declined Jobs"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={!filterOptions.showEmptyAppliedDate}
            onChange={handleShowEmptyAppliedDateChange}
            color="primary"
          />
        }
        label="Hide Jobs Not Applied To"
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


