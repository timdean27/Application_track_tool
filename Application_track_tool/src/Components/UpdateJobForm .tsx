import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const UpdateJobForm = ({ job, onUpdate }) => {
  const [updatedJob, setUpdatedJob] = useState(job);

  const handleChange = (e, field) => {
    setUpdatedJob({ ...updatedJob, [field]: e.target.value });
  };

  const handleSubmit = () => {
    onUpdate(updatedJob);
  };

  return (
    <div>
      <TextField
        label="Job Title"
        value={updatedJob.job}
        onChange={(e) => handleChange(e, 'job')}
        fullWidth
      />
      <TextField
        label="Description"
        value={updatedJob.description}
        onChange={(e) => handleChange(e, 'description')}
        fullWidth
      />
      <TextField
        label="Company"
        value={updatedJob.company}
        onChange={(e) => handleChange(e, 'company')}
        fullWidth
      />
      {/* Add more input fields for other job details */}
      <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '10px' }}>
        Update Job
      </Button>
    </div>
  );
};

export default UpdateJobForm;
