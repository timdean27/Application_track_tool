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
    showDeclined: true,
    showEmptyAppliedDate: true,
    hideAppliedTo: false, // Added hideAppliedTo option
  });

  useEffect(() => {
    fetchJobs();
  }, []); // Fetch all jobs when the component mounts

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
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

  const filterJobs = (jobs: any[], filterOptions: any) => {
    if (!jobs || jobs.length === 0) {
      return [];
    }

    // Sort jobs based on applied date
    let sortedJobs = sortJobsByAppliedDate(jobs, filterOptions.sortByDate);

    return sortedJobs.filter((job) => {
      // Filter by company name
      if (
        filterOptions.company &&
        job.company.toLowerCase().indexOf(filterOptions.company.toLowerCase()) === -1
      ) {
        return false;
      }
      // Filter by other options
      if (!filterOptions.showDeclined && job.declined) return false;
      if (!filterOptions.showEmptyAppliedDate && !job.dateApplied) return false;
      if (filterOptions.hideAppliedTo && job.dateApplied) return false; // Hide applied jobs
      return true;
    });
  };

  const sortJobsByAppliedDate = (jobs: any[], sortByDate: string) => {
    const hasDate = (job: any) => !!job.dateApplied;

    // Sort jobs based on the sortByDate parameter
    return jobs.slice().sort((a, b) => {
      if (!hasDate(a) && !hasDate(b)) return 0;
      if (!hasDate(a)) return 1;
      if (!hasDate(b)) return -1;

      const dateA = new Date(a.dateApplied).getTime();
      const dateB = new Date(b.dateApplied).getTime();

      if (sortByDate === "asc") {
        return dateA - dateB;
      } else if (sortByDate === "desc") {
        return dateB - dateA;
      } else {
        return 0; // No sorting needed
      }
    });
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="body1">Error: {error}</Typography>;
  }

  const filteredJobs = filterJobs(jobs, filterOptions);

  return (
    <div>
      <FilterComp
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
      />
      <Grid container spacing={2}>
        {filteredJobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Card
              sx={{
                border: "1px solid #f0f0f0",
                borderRadius: "8px",
                backgroundColor: job.declined
                  ? "#ffcccc"
                  : job.dateApplied
                  ? "#86b1fc"
                  : "",
              }}
              onClick={
                !expandedJobs[job.id]
                  ? () => toggleJobExpansion(job.id)
                  : undefined
              }
              onDoubleClick={
                expandedJobs[job.id]
                  ? () => toggleJobExpansion(job.id)
                  : undefined
              }
            >
              <CardContent style={{ paddingRight: "16px" }}>
                <Typography gutterBottom variant="h5" component="div">
                  <Box fontWeight="bold">
                    {job.job} - {job.company}
                  </Box>
                </Typography>
                {expandedJobs[job.id] && (
                  <>
                    <Box
                      mb={1}
                      border={1}
                      borderColor="grey.300"
                      borderRadius="4px"
                      p={1}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ overflowWrap: "break-word" }}
                      >
                        <Box fontWeight="bold">Description:</Box>{" "}
                        {job.description}
                      </Typography>
                    </Box>
                    <Box
                      mb={1}
                      border={1}
                      borderColor="grey.300"
                      borderRadius="4px"
                      p={1}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ overflowWrap: "break-word" }}
                      >
                        <Box fontWeight="bold">Job Posting Link:</Box>{" "}
                        <a
                          href={job.jobPostingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {job.jobPostingLink ? "CLICK" : ""}
                        </a>
                      </Typography>
                    </Box>
                    <Box
                      mb={1}
                      border={1}
                      borderColor="grey.300"
                      borderRadius="4px"
                      p={1}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ overflowWrap: "break-word" }}
                      >
                        <Box fontWeight="bold">Resume Link:</Box>{" "}
                        <a
                          href={job.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {job.resume ? "CLICK" : ""}
                        </a>
                      </Typography>
                    </Box>
                    <Box
                      mb={1}
                      border={1}
                      borderColor="grey.300"
                      borderRadius="4px"
                      p={1}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ overflowWrap: "break-word" }}
                      >
                        <Box fontWeight="bold">Cover Letter Link:</Box>{" "}
                        <a
                          href={job.coverLetter}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {job.coverLetter ? "CLICK" : ""}
                        </a>
                      </Typography>
                    </Box>
                    <Box
                      mb={1}
                      border={1}
                      borderColor="grey.300"
                      borderRadius="4px"
                      p={1}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ overflowWrap: "break-word" }}
                      >
                        <Box fontWeight="bold">Screening Interview:</Box>{" "}
                        {job.screeningInterview}
                      </Typography>
                    </Box>
                    <Box
                      mb={1}
                      border={1}
                      borderColor="grey.300"
                      borderRadius="4px"
                      p={1}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ overflowWrap: "break-word" }}
                      >
                        <Box fontWeight="bold">
                          Date of Screening Interview:
                        </Box>{" "}
                        {job.dateOfScreeningInterview}
                      </Typography>
                    </Box>
                    <Box
                      mb={1}
                      border={1}
                      borderColor="grey.300"
                      borderRadius="4px"
                      p={1}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ overflowWrap: "break-word" }}
                      >
                        <Box fontWeight="bold">Coding Interview:</Box>{" "}
                        {job.codingInterview}
                      </Typography>
                    </Box>
                    <Box
                      mb={1}
                      border={1}
                      borderColor="grey.300"
                      borderRadius="4px"
                      p={1}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ overflowWrap: "break-word" }}
                      >
                        <Box fontWeight="bold">Date of Coding Interview:</Box>{" "}
                        {job.dateOfCodingInterview}
                      </Typography>
                    </Box>
                    <Box
                      mb={1}
                      border={1}
                      borderColor="grey.300"
                      borderRadius="4px"
                      p={1}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ overflowWrap: "break-word" }}
                      >
                        <Box fontWeight="bold">Behavior Interview:</Box>{" "}
                        {job.behaviorInterview}
                      </Typography>
                    </Box>
                    <Box
                      mb={1}
                      border={1}
                      borderColor="grey.300"
                      borderRadius="4px"
                      p={1}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ overflowWrap: "break-word" }}
                      >
                        <Box fontWeight="bold">
                          Date of Behavior Interview:
                        </Box>{" "}
                        {job.dateOfBehaviorInterview}
                      </Typography>
                    </Box>
                    <Box
                      mb={1}
                      border={1}
                      borderColor="grey.300"
                      borderRadius="4px"
                      p={1}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ overflowWrap: "break-word" }}
                      >
                        <Box fontWeight="bold">Date Applied:</Box>{" "}
                        {job.dateApplied}
                      </Typography>
                    </Box>
                    <Box
                      mb={1}
                      border={1}
                      borderColor="grey.300"
                      borderRadius="4px"
                      p={1}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ overflowWrap: "break-word" }}
                      >
                        <Box fontWeight="bold">
                          Follow-up for Information:
                        </Box>{" "}
                        {job.followupForInformation}
                      </Typography>
                    </Box>
                    <Box
                      mb={1}
                      border={1}
                      borderColor="grey.300"
                      borderRadius="4px"
                      p={1}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ overflowWrap: "break-word" }}
                      >
                        <Box fontWeight="bold">Advice Received:</Box>{" "}
                        {job.adviceReceived}
                      </Typography>
                    </Box>
                    <Box
                      mb={1}
                      border={1}
                      borderColor="grey.300"
                      borderRadius="4px"
                      p={1}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ overflowWrap: "break-word" }}
                      >
                        <Box fontWeight="bold">Date Followed Up:</Box>{" "}
                        {job.dateFollowedUp}
                      </Typography>
                    </Box>
                    <Box
                      border={1}
                      borderColor="grey.300"
                      borderRadius="4px"
                      p={1}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ overflowWrap: "break-word" }}
                      >
                        <Box fontWeight="bold">Declined:</Box>{" "}
                        {job.declined ? "True" : "False"}
                      </Typography>
                    </Box>
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
