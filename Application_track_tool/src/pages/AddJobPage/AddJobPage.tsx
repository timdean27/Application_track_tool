import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";

const AddJobPage = () => {
  const [job, setJob] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [jobPostingLink, setJobPostingLink] = useState("");
  const [resume, setResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [screeningInterview, setScreeningInterview] = useState("");
  const [dateOfScreeningInterview, setDateOfScreeningInterview] = useState(null);
  const [codingInterview, setCodingInterview] = useState("");
  const [dateOfCodingInterview, setDateOfCodingInterview] = useState(null);
  const [behaviorInterview, setBehaviorInterview] = useState("");
  const [dateOfBehaviorInterview, setDateOfBehaviorInterview] = useState(null);
  const [dateApplied, setDateApplied] = useState(null);
  const [followupForInformation, setFollowupForInformation] = useState("");
  const [adviceReceived, setAdviceReceived] = useState("");
  const [dateFollowedUp, setDateFollowedUp] = useState(null);

  const handleAddJob = async () => {
    try {
      const jobData = {
        job,
        description,
        company,
        jobPostingLink,
        resume,
        coverLetter,
        screeningInterview,
        dateOfScreeningInterview: dateOfScreeningInterview ? dateOfScreeningInterview.toISOString().slice(0, 10) : null,
        codingInterview,
        dateOfCodingInterview: dateOfCodingInterview ? dateOfCodingInterview.toISOString().slice(0, 10) : null,
        behaviorInterview,
        dateOfBehaviorInterview: dateOfBehaviorInterview ? dateOfBehaviorInterview.toISOString().slice(0, 10) : null,
        dateApplied: dateApplied ? dateApplied.toISOString().slice(0, 10) : null,
        followupForInformation,
        adviceReceived,
        dateFollowedUp: dateFollowedUp ? dateFollowedUp.toISOString().slice(0, 10) : null,
      };

      await axios.post("http://localhost:8080/jobapplication/add", jobData);

      // Reset form fields after successful submission
      setJob("");
      setDescription("");
      setCompany("");
      setJobPostingLink("");
      setResume("");
      setCoverLetter("");
      setScreeningInterview("");
      setDateOfScreeningInterview(null);
      setCodingInterview("");
      setDateOfCodingInterview(null);
      setBehaviorInterview("");
      setDateOfBehaviorInterview(null);
      setDateApplied(null);
      setFollowupForInformation("");
      setAdviceReceived("");
      setDateFollowedUp(null);

      alert("Job added successfully!");
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Error adding job: " + error.message);
    }
  };

  return (
    <Stack spacing={2} sx={{ maxWidth: 400, margin: "auto" }}>
      <Typography variant="h4" component="h1" color="primary">
        Add New Job
      </Typography>

      <FormControl fullWidth>
        <FormLabel>Job Title</FormLabel>
        <Input value={job} onChange={(e) => setJob(e.target.value)} />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>Description</FormLabel>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>Company</FormLabel>
        <Input value={company} onChange={(e) => setCompany(e.target.value)} />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>Job Posting Link</FormLabel>
        <Input
          value={jobPostingLink}
          onChange={(e) => setJobPostingLink(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>Resume</FormLabel>
        <Input value={resume} onChange={(e) => setResume(e.target.value)} />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>Cover Letter</FormLabel>
        <Input
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>Screening Interview</FormLabel>
        <Input
          value={screeningInterview}
          onChange={(e) => setScreeningInterview(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>Date of Screening Interview</FormLabel>
        <Input
          type="date"
          value={dateOfScreeningInterview ? dateOfScreeningInterview.toISOString().slice(0, 10) : ""}
          onChange={(e) => setDateOfScreeningInterview(new Date(e.target.value))}
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>Coding Interview</FormLabel>
        <Input
          value={codingInterview}
          onChange={(e) => setCodingInterview(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>Date of Coding Interview</FormLabel>
        <Input
          type="date"
          value={dateOfCodingInterview ? dateOfCodingInterview.toISOString().slice(0, 10) : ""}
          onChange={(e) => setDateOfCodingInterview(new Date(e.target.value))}
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>Behavior Interview</FormLabel>
        <Input
          value={behaviorInterview}
          onChange={(e          ) => setBehaviorInterview(e.target.value)}
          />
        </FormControl>
  
        <FormControl fullWidth>
          <FormLabel>Date of Behavior Interview</FormLabel>
          <Input
            type="date"
            value={dateOfBehaviorInterview ? dateOfBehaviorInterview.toISOString().slice(0, 10) : ""}
            onChange={(e) => setDateOfBehaviorInterview(new Date(e.target.value))}
          />
        </FormControl>
  
        <FormControl fullWidth>
          <FormLabel>Date Applied</FormLabel>
          <Input
            type="date"
            value={dateApplied ? dateApplied.toISOString().slice(0, 10) : ""}
            onChange={(e) => setDateApplied(new Date(e.target.value))}
          />
        </FormControl>
  
        <FormControl fullWidth>
          <FormLabel>Follow-up for Information</FormLabel>
          <Input
            value={followupForInformation}
            onChange={(e) => setFollowupForInformation(e.target.value)}
          />
        </FormControl>
  
        <FormControl fullWidth>
          <FormLabel>Advice Received</FormLabel>
          <Input
            value={adviceReceived}
            onChange={(e) => setAdviceReceived(e.target.value)}
          />
        </FormControl>
  
        <FormControl fullWidth>
          <FormLabel>Date Followed Up</FormLabel>
          <Input
            type="date"
            value={dateFollowedUp ? dateFollowedUp.toISOString().slice(0, 10) : ""}
            onChange={(e) => setDateFollowedUp(new Date(e.target.value))}
          />
        </FormControl>
  
        <Button onClick={handleAddJob} variant="contained" color="primary">
          Add Job
        </Button>
      </Stack>
    );
  };
  
  export default AddJobPage;
  





