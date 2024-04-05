import { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Typography,
  Grid,
  Checkbox,
  Box,
} from "@mui/material";
import axios from "axios";

const BASE_URL = "http://54.158.192.60:8090";

const AddJobPage = () => {
  const [job, setJob] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [declined, setDeclined] = useState<boolean>(false); // State for declined option
  const [jobPostingLink, setJobPostingLink] = useState<string>("");
  const [resume, setResume] = useState<string>("");
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [screeningInterview, setScreeningInterview] = useState<string>("");
  const [dateOfScreeningInterview, setDateOfScreeningInterview] =
    useState<Date | null>(null);
  const [codingInterview, setCodingInterview] = useState<string>("");
  const [dateOfCodingInterview, setDateOfCodingInterview] =
    useState<Date | null>(null);
  const [behaviorInterview, setBehaviorInterview] = useState<string>("");
  const [dateOfBehaviorInterview, setDateOfBehaviorInterview] =
    useState<Date | null>(null);
  const [dateApplied, setDateApplied] = useState<Date | null>(null);
  const [followupForInformation, setFollowupForInformation] = useState<string>(
    ""
  );
  const [adviceReceived, setAdviceReceived] = useState<string>("");
  const [dateFollowedUp, setDateFollowedUp] = useState<Date | null>(null);

  const handleAddJob = async () => {
    try {
      const jobData = {
        job,
        description,
        company,
        declined, // Include declined option in the data object
        jobPostingLink,
        resume,
        coverLetter,
        screeningInterview,
        dateOfScreeningInterview: dateOfScreeningInterview
          ? dateOfScreeningInterview.toISOString().slice(0, 10)
          : null,
        codingInterview,
        dateOfCodingInterview: dateOfCodingInterview
          ? dateOfCodingInterview.toISOString().slice(0, 10)
          : null,
        behaviorInterview,
        dateOfBehaviorInterview: dateOfBehaviorInterview
          ? dateOfBehaviorInterview.toISOString().slice(0, 10)
          : null,
        dateApplied: dateApplied
          ? dateApplied.toISOString().slice(0, 10)
          : null,
        followupForInformation,
        adviceReceived,
        dateFollowedUp: dateFollowedUp
          ? dateFollowedUp.toISOString().slice(0, 10)
          : null,
      };

      await axios.post(`${BASE_URL}/jobapplication/add`, jobData);

      // Reset form fields after successful submission
      setJob("");
      setDescription("");
      setCompany("");
      setDeclined(false); // Reset declined option
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
    } catch (error: any) {
      console.error("Error adding job:", error);
      alert("Error adding job: " + error.message);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Box border={1} borderRadius={4} borderColor="orange" p={2}>
          <Stack spacing={2} sx={{ maxWidth: 400 }}>
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
              <Input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Declined</FormLabel>
              <Checkbox
                checked={declined}
                onChange={(e) => setDeclined(e.target.checked)}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Job Posting Link</FormLabel>
              <Input
                value={jobPostingLink}
                onChange={(e) => setJobPostingLink(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel>Date Applied</FormLabel>
              <Input
                type="date"
                value={
                  dateApplied ? dateApplied.toISOString().slice(0, 10) : ""
                }
                onChange={(e) => setDateApplied(new Date(e.target.value))}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Resume</FormLabel>
              <Input
                value={resume}
                onChange={(e) => setResume(e.target.value)}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Cover Letter</FormLabel>
              <Input
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
            </FormControl>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box border={1} borderRadius={4} borderColor="orange" p={2}>
          <Stack spacing={2} sx={{ maxWidth: 400 }}>
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
                value={
                  dateOfScreeningInterview
                    ? dateOfScreeningInterview.toISOString().slice(0, 10)
                    : ""
                }
                onChange={(e) =>
                  setDateOfScreeningInterview(new Date(e.target.value))
                }
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
                value={
                  dateOfCodingInterview
                    ? dateOfCodingInterview.toISOString().slice(0, 10)
                    : ""
                }
                onChange={(e) =>
                  setDateOfCodingInterview(new Date(e.target.value))
                }
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Behavior Interview</FormLabel>
              <Input
                value={behaviorInterview}
                onChange={(e) => setBehaviorInterview(e.target.value)}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Date of Behavior Interview</FormLabel>
              <Input
                type="date"
                value={
                  dateOfBehaviorInterview
                    ? dateOfBehaviorInterview.toISOString().slice(0, 10)
                    : ""
                }
                onChange={(e) =>
                  setDateOfBehaviorInterview(new Date(e.target.value))
                }
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
                value={
                  dateFollowedUp
                    ? dateFollowedUp.toISOString().slice(0, 10)
                    : ""
                }
                onChange={(e) => setDateFollowedUp(new Date(e.target.value))}
              />
            </FormControl>

            <Button
              onClick={handleAddJob}
              variant="contained"
              color="primary"
            >
              Add Job
            </Button>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddJobPage;
