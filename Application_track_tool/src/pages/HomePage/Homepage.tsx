import React, { useState } from "react";
import {
  Button,
  VStack,
  Text,
  Input,
  FormControl,
  FormLabel,
  Checkbox,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Homepage: React.FC = ({ jobs, addJob, updateJob, deleteJob }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobPostingLink, setJobPostingLink] = useState("");
  const [resume, setResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [screeningInterview, setScreeningInterview] = useState(false);
  const [dateOfScreeningInterview, setDateOfScreeningInterview] =
    useState<Date | null>(null);
  const [codingInterview, setCodingInterview] = useState(false);
  const [dateOfCodingInterview, setDateOfCodingInterview] =
    useState<Date | null>(null);
  const [behaviorInterview, setBehaviorInterview] = useState(false);
  const [dateOfBehaviorInterview, setDateOfBehaviorInterview] =
    useState<Date | null>(null);
  const [dateApplied, setDateApplied] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control visibility of date picker

  const handleAddJob = async () => {
    try {
      // Prepare job data
      const jobData = {
        jobTitle,
        company,
        jobPostingLink,
        resume,
        coverLetter,
        screeningInterview: screeningInterview ? "Yes" : "No",
        dateOfScreeningInterview,
        codingInterview: codingInterview ? "Yes" : "No",
        dateOfCodingInterview,
        behaviorInterview: behaviorInterview ? "Yes" : "No",
        dateOfBehaviorInterview,
        dateApplied,
      };

      await addJob(jobData);
      // Reset form fields after successful addition
      setJobTitle("");
      setCompany("");
      setJobPostingLink("");
      setResume("");
      setCoverLetter("");
      setScreeningInterview(false);
      setDateOfScreeningInterview(null);
      setCodingInterview(false);
      setDateOfCodingInterview(null);
      setBehaviorInterview(false);
      setDateOfBehaviorInterview(null);
      setDateApplied(null);
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const handleUpdateJob = async () => {
    // Add your implementation for updating a job
    console.log("Update job functionality");
  };

  const handleDeleteJob = async () => {
    // Add your implementation for deleting a job
    console.log("Delete job functionality");
  };

  return (
    <VStack spacing={4} align="flex-start">
      <Text fontSize="xl" fontWeight="bold" color="black">
        HomePage
      </Text>

      <FormControl>
        <FormLabel>Job Title</FormLabel>
        <Input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
      </FormControl>

      <FormControl>
        <FormLabel>Company</FormLabel>
        <Input value={company} onChange={(e) => setCompany(e.target.value)} />
      </FormControl>

      <FormControl>
        <FormLabel>Job Posting Link</FormLabel>
        <Input
          value={jobPostingLink}
          onChange={(e) => setJobPostingLink(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Resume</FormLabel>
        <Input value={resume} onChange={(e) => setResume(e.target.value)} />
      </FormControl>

      <FormControl>
        <FormLabel>Cover Letter</FormLabel>
        <Input
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        />
      </FormControl>

      <Checkbox
        colorScheme="green"
        isChecked={screeningInterview}
        onChange={(e) => setScreeningInterview(e.target.checked)}
      >
        Screening Interview
      </Checkbox>

      <DatePicker
        showIcon
        showTimeSelect
        selected={dateOfScreeningInterview}
        onChange={(date) => {
          console.log(date); // Log out the selected date
          setDateOfScreeningInterview(date); // Update the state with the selected date
        }}
        isClearable
        dateFormat="Pp"
        placeholderText="MM/dd/yyyy Time"
      />

      <Checkbox
        colorScheme="green"
        isChecked={codingInterview}
        onChange={(e) => setCodingInterview(e.target.checked)}
      >
        Coding Interview
      </Checkbox>

      <DatePicker
        showIcon
        showTimeSelect
        selected={dateOfCodingInterview}
        onChange={(date) => {
          console.log(date); // Log out the selected date
          setDateOfCodingInterview(date); // Update the state with the selected date
        }}
        isClearable
        dateFormat="Pp"
        placeholderText="MM/dd/yyyy Time"
      />

      <Checkbox
        colorScheme="green"
        isChecked={behaviorInterview}
        onChange={(e) => setBehaviorInterview(e.target.checked)}
      >
        Behavior Interview
      </Checkbox>

      <DatePicker
        showIcon
        showTimeSelect
        selected={dateOfBehaviorInterview}
        onChange={(date) => {
          console.log(date); // Log out the selected date
          setDateOfBehaviorInterview(date); // Update the state with the selected date
        }}
        isClearable
        dateFormat="Pp"
        placeholderText="MM/dd/yyyy Time"
      />

      <Button onClick={handleAddJob}>Add Job</Button>
      <Button onClick={handleUpdateJob}>Update Job</Button>
      <Button onClick={handleDeleteJob}>Delete Job</Button>
    </VStack>
  );
};

export default Homepage;
