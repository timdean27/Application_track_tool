import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  Box,
} from "@mui/material";
import UpdateJobForm from "../../Components/UpdateJobForm";

const BASE_URL = "http://54.158.192.60:8090";

const AllJobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState<boolean>(false);
  const [expandedJobs, setExpandedJobs] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchJobs();
  }, []);

  // Function to fetch all jobs
  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/jobapplication`);
      setJobs(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError("Error: " + error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        setError("Error: No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("Error: " + error.message);
      }
    }
  };

  // Function to handle deletion of a job
  const handleDeleteJob = async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}/jobapplication/${id}`);
      fetchJobs(); // Refresh the job list after deletion
    } catch (error) {
      console.error("Error deleting job:", error);
      // Handle error
    }
  };

  // Function to handle update of a job
  const handleUpdateJob = async (updatedJob: any) => {
    try {
      await axios.put(
        `${BASE_URL}/jobapplication/updates/${updatedJob.id}`,
        updatedJob
      );
      fetchJobs(); // Refresh the job list after update
      setSelectedJob(null); // Clear selected job
      setIsUpdateFormOpen(false); // Close the update form
    } catch (error) {
      console.error("Error updating job:", error);
      // Handle error
    }
  };

  // Function to toggle job expansion
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
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div>
        <h1>All Jobs</h1>
        <Link to="/">Add New Job</Link>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {jobs.map((job) => (
          <Card
            key={job.id}
            sx={{
              maxWidth: 345,
              margin: 1,
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
                    Date of Screening Interview: {job.dateOfScreeningInterview}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Coding Interview: {job.codingInterview}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date of Coding Interview: {job.dateOfCodingInterview}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Behavior Interview: {job.behaviorInterview}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date of Behavior Interview: {job.dateOfBehaviorInterview}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date Applied: {job.dateApplied}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Follow-up for Information: {job.followupForInformation}
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
              <Box mt={2}>
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
                    e.stopPropagation(); // Prevent card click event from firing
                    setSelectedJob(job);
                    setIsUpdateFormOpen(true);
                  }}
                >
                  Update
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Render update form if selectedJob is not null and isUpdateFormOpen is true */}
      {selectedJob && isUpdateFormOpen && (
        <div style={{ marginTop: "20px" }}>
          <UpdateJobForm
            job={selectedJob}
            onUpdate={handleUpdateJob}
            onCancel={() => setIsUpdateFormOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default AllJobsPage;
