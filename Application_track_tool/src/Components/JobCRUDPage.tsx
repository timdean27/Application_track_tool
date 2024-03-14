import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Homepage from '../pages/HomePage/Homepage'; // Import your Homepage component

const BASE_URL = 'http://localhost:8080'; // Replace with your backend URL

const JobCRUDPage: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchJobs();
  }, []);

  // Function to fetch all jobs
  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/jobs`);
      setJobs(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError('Error fetching jobs: ' + error.message);
    }
  };

  // Function to add a new job
  const addJob = async (jobData: any) => {
    try {
      setIsLoading(true);
      await axios.post(`${BASE_URL}/jobs/add`, jobData);
      setIsLoading(false);
      fetchJobs(); // Fetch jobs again to update the list
    } catch (error) {
      setIsLoading(false);
      setError('Error adding job: ' + error.message);
    }
  };

  // Function to update a job
  const updateJob = async (jobId: number, updatedJobData: any) => {
    try {
      setIsLoading(true);
      await axios.put(`${BASE_URL}/jobs/update/${jobId}`, updatedJobData);
      setIsLoading(false);
      fetchJobs(); // Fetch jobs again to update the list
    } catch (error) {
      setIsLoading(false);
      setError(`Error updating job with ID ${jobId}: ` + error.message);
    }
  };

  // Function to delete a job
  const deleteJob = async (jobId: number) => {
    try {
      setIsLoading(true);
      await axios.delete(`${BASE_URL}/jobs/delete/${jobId}`);
      setIsLoading(false);
      fetchJobs(); // Fetch jobs again to update the list
    } catch (error) {
      setIsLoading(false);
      setError(`Error deleting job with ID ${jobId}: ` + error.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Render your Homepage component here with props for jobs, addJob, updateJob, and deleteJob */}
      <Homepage jobs={jobs} addJob={addJob} updateJob={updateJob} deleteJob={deleteJob} />
    </div>
  );
};

export default JobCRUDPage;


