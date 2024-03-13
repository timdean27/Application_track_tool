import React, { useState } from 'react';
import { Button, VStack, Text, Input, FormControl, FormLabel,Checkbox, Textarea } from "@chakra-ui/react";
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';

const Homepage: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobPostingLink, setJobPostingLink] = useState('');
  const [resume, setResume] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [screeningInterview, setScreeningInterview] = useState('');
  const [dateOfScreeningInterview, setDateOfScreeningInterview] = useState<Date | null>(null);
  const [codingInterview, setCodingInterview] = useState('');

  const [dateOfCodingInterview, setDateOfCodingInterview] = useState<Date | null>(null);
  const [behaviorInterview, setBehaviorInterview] = useState('');
  const [dateOfBehaviorInterview, setDateOfBehaviorInterview] = useState<Date | null>(null);
  const [dateApplied, setDateApplied] = useState<Date | null>(null);

  const handleUpdate = () => {
    // Add your logic to handle the update here
    console.log("Update button clicked!");
    // You can use the state values (jobTitle, company, etc.) for further processing
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
        <Text onClick={() => document.getElementById('appliedDatePicker')?.click()}>
          Date Applied
          <FaCalendarAlt
            style={{
              marginLeft: '5px',
              cursor: 'pointer',
            }}
          />
        </Text>
        <DatePicker
          id="appliedDatePicker"
          selected={dateApplied}
          onChange={(date) => setDateApplied(date)}
          style={{ display: 'none' }} // hide the DatePicker initially
        />
      </FormControl>
      <FormControl>
        <FormLabel>Job Posting Link</FormLabel>
        <Input value={jobPostingLink} onChange={(e) => setJobPostingLink(e.target.value)} />
      </FormControl>

      <FormControl>
        <FormLabel>Resume</FormLabel>
        <Input value={resume} onChange={(e) => setResume(e.target.value)} />
      </FormControl>

      <FormControl>
        <FormLabel>Cover Letter</FormLabel>
        <Textarea value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} />
      </FormControl>

      <Checkbox
  colorScheme='green'
  isChecked={!!screeningInterview}
  onChange={(e) => setScreeningInterview(e.target.checked)}
>
  Screening Interview
</Checkbox>

      <FormControl>
        <Text onClick={() => document.getElementById('ScreeninginterviewDatePicker')?.click()}>
          Date of Screening Interview
          <FaCalendarAlt
            style={{
              marginLeft: '5px',
              cursor: 'pointer',
            }}
          />
        </Text>
        <DatePicker
          id="ScreeninginterviewDatePicker"
          selected={dateOfScreeningInterview}
          onChange={(date) => setDateOfScreeningInterview(date)}
          style={{ display: 'none' }} // hide the DatePicker initially
        />
      </FormControl>

      <Checkbox
  colorScheme='green'
  isChecked={!!codingInterview}
  onChange={(e) => setCodingInterview(e.target.checked)}
>
  Coding Interview
</Checkbox>

      <FormControl>
        <Text onClick={() => document.getElementById('CodinginterviewDatePicker')?.click()}>
          Date of Coding Interview
          <FaCalendarAlt
            style={{
              marginLeft: '5px',
              cursor: 'pointer',
            }}
          />
        </Text>
        <DatePicker
          id="CodinginterviewDatePicker"
          selected={dateOfCodingInterview}
          onChange={(date) => setDateOfCodingInterview(date)}
          style={{ display: 'none' }} // hide the DatePicker initially
        />
      </FormControl>

      <Checkbox
  colorScheme='green'
  isChecked={!!behaviorInterview}
  onChange={(e) => setBehaviorInterview(e.target.checked)}
>
  Behavior Interview
</Checkbox>

      <FormControl>
        <Text onClick={() => document.getElementById('BehaviorinterviewDatePicker')?.click()}>
          Date of Behavior Interview
          <FaCalendarAlt
            style={{
              marginLeft: '5px',
              cursor: 'pointer',
            }}
          />
        </Text>
        <DatePicker
          id="BehaviorinterviewDatePicker"
          selected={dateOfBehaviorInterview}
          onChange={(date) => setDateOfBehaviorInterview(date)}
          style={{ display: 'none' }} // hide the DatePicker initially
        />
      </FormControl>

      <Button onClick={handleUpdate}>Update</Button>
    </VStack>
  );
};

export default Homepage;
