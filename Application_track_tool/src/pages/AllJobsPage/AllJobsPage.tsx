// Import necessary modules and components
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  Box,
  Grid,
} from "@mui/material";
import UpdateJobForm from "../../Components/UpdateJobForm";
import FilterComp from "../../Components/FilterComp/FilterComp";

const BASE_URL = "http://34.227.157.5:8090";

const AllJobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState<boolean>(false);
  const [expandedJobs, setExpandedJobs] = useState<Record<string, boolean>>({});
  const [filterOptions, setFilterOptions] = useState<any>({
    sortByDate: "",
    showDeclined: false,
    company: "", // Change to 'company' instead of 'companyName'
  });

  useEffect(() => {
    fetchJobs();
  }, [filterOptions]); // Update jobs when filter options change

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      console.log("Filter options:", filterOptions);
      const response = await axios.get(`${BASE_URL}/jobapplication`);
      setJobs(response.data);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        setError("Error: " + error.response.data);
      } else if (axios.isAxiosError(error) && error.request) {
        setError("Error: No response received from the server");
      } else {
        setError("Error: " + error.message);
      }
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}/jobapplication/${id}`);
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleUpdateJob = async (updatedJob: any) => {
    try {
      await axios.put(
        `${BASE_URL}/jobapplication/updates/${updatedJob.id}`,
        updatedJob
      );
      fetchJobs();
      setIsUpdateFormOpen(false);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const handleJobSelect = (jobId: string) => {
    if (selectedJobId === jobId) {
      setSelectedJobId(null);
      setIsUpdateFormOpen(false);
    } else {
      setSelectedJobId(jobId);
      setIsUpdateFormOpen(true);
    }
  };

  const toggleJobExpansion = (id: string) => {
    setExpandedJobs((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="body1">Error: {error}</Typography>;
  }

  return (
    <div>
      <FilterComp
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
      />
      <Grid container spacing={2}>
        {jobs
          .filter((job) =>
            filterOptions.company
              ? job.company
                  .toLowerCase()
                  .includes(filterOptions.company.toLowerCase())
              : true
          )
          .map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <Card
                sx={{
                  border: "1px solid #f0f0f0",
                  borderRadius: "8px",
                  backgroundColor: job.declined ? "#ffcccc" : "",
                }}
                onClick={() => toggleJobExpansion(job.id)}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {job.job} - {job.company}
                  </Typography>
                  {expandedJobs[job.id] && (
                    <>
                      <Typography variant="body2" color="text.secondary">
                        Description: {job.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Job Posting Link: {job.jobPostingLink}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Resume: {job.resume}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Cover Letter: {job.coverLetter}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Screening Interview: {job.screeningInterview}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Date of Screening Interview:{" "}
                        {job.dateOfScreeningInterview}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Coding Interview: {job.codingInterview}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Date of Coding Interview:{" "}
                        {job.dateOfCodingInterview}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Behavior Interview: {job.behaviorInterview}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Date of Behavior Interview:{" "}
                        {job.dateOfBehaviorInterview}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Date Applied: {job.dateApplied}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Follow-up for Information:{" "}
                        {job.followupForInformation}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Advice Received: {job.adviceReceived}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Date Followed Up: {job.dateFollowedUp}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Declined: {job.declined ? "True" : "False"}
                      </Typography>
                    </>
                  )}
                          <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDeleteJob(job.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: "8px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJobSelect(job.id);
                    }}
                  >
                    Update
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {isUpdateFormOpen && (
        <div style={{ marginTop: "20px" }}>
          <UpdateJobForm
            job={jobs.find((job) => job.id === selectedJobId)}
            onUpdate={handleUpdateJob}
            onCancel={() => setIsUpdateFormOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default AllJobsPage;
