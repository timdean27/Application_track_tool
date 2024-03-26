import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress, Button, Box } from '@mui/material';
import UpdateJobForm from '../../Components/UpdateJobForm '

const BASE_URL = 'http://localhost:8080'; // Replace with your backend URL

const AllJobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [selectedJob, setSelectedJob] = useState<any>(null);

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
        setError('Error: ' + error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        setError('Error: No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('Error: ' + error.message);
      }
    }
  };

  // Function to handle deletion of a job
  const handleDeleteJob = async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}/jobapplication/${id}`);
      fetchJobs(); // Refresh the job list after deletion
    } catch (error) {
      console.error('Error deleting job:', error);
      // Handle error
    }
  };

  // Function to handle update of a job
  const handleUpdateJob = async (updatedJob: any) => {
    try {
      await axios.put(`${BASE_URL}/jobapplication/updates/${updatedJob.id}`, updatedJob);
      fetchJobs(); // Refresh the job list after update
      setSelectedJob(null); // Clear selected job
    } catch (error) {
      console.error('Error updating job:', error);
      // Handle error
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>All Jobs</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {jobs.map((job) => (
          <Card key={job.id} sx={{ maxWidth: 345, margin: 1 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {job.job} - {job.company}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description: {job.description}
              </Typography>
              {/* Display other job details */}
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={() => handleDeleteJob(job.id)}>
                  Delete
                </Button>
                {/* Add update button with onClick handler */}
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: '8px' }}
                  onClick={() => setSelectedJob(job)}
                >
                  Update
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Render update form if selectedJob is not null */}
      {selectedJob && (
        <div style={{ marginTop: '20px' }}>
          <h2>Update Job</h2>
          <UpdateJobForm job={selectedJob} onUpdate={handleUpdateJob} />
        </div>
      )}
    </div>
  );
};

export default AllJobsPage;

