import React, { useState } from "react";
import {
  SelectChangeEvent,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

interface FilterOptions {
  sortByDate: string;
  showDeclined: boolean;
  showEmptyAppliedDate: boolean;
  company: string;
  hideAppliedTo: boolean; // New property to hide jobs applied to
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
    setFilterOptions({ ...filterOptions, company: company.trim() });
  };

  const handleClear = () => {
    setCompany("");
    setFilterOptions({ ...filterOptions, company: "" });
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortByDate(event.target.value);
    setFilterOptions({ ...filterOptions, sortByDate: event.target.value });
  };

  const handleShowDeclinedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterOptions({ ...filterOptions, showDeclined: !event.target.checked });
  };

  const handleShowEmptyAppliedDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterOptions({
      ...filterOptions,
      showEmptyAppliedDate: !event.target.checked,
    });
  };

  const handleHideAppliedToChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterOptions({ ...filterOptions, hideAppliedTo: event.target.checked });
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Box mb={1} border={1} borderColor="grey.300" borderRadius="4px" p={1}>
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
      <InputLabel htmlFor="sort-by-date">Sort by Date:</InputLabel>
      <Select
        id="sort-by-date"
        value={sortByDate}
        onChange={handleSortChange}
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
      <FormControlLabel
        control={
          <Checkbox
            checked={filterOptions.hideAppliedTo}
            onChange={handleHideAppliedToChange}
            color="primary"
          />
        }
        label="Hide Jobs Applied To"
      />
    </Box>
  );
};

export default FilterComp;
