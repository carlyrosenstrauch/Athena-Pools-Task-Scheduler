// pages/jobs/[id]/edit.tsx (or .js)
"use client"; // KEEP THIS LINE AT THE VERY TOP

import React from "react";
import { useRouter, usePathname } from "next/navigation"; // ADD usePathname
import styled from "styled-components";

type JobStatus = "Scheduled" | "In Progress" | "Completed" | "Overdue";

interface Job {
  id: string;
  jobName: string;
  clientName: string;
  status: JobStatus;
  gateCode: string;
  notes: string;
  tasks: string[];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  position: relative;
`;

const BackLink = styled.a`
  display: flex;
  align-items: center;
  color: #3b82f6;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 42rem;
  cursor: pointer;

  &:hover {
    color: #2563eb;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
  }
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  width: 100%;
  max-width: 42rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  min-height: 6rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const SaveButton = styled(Button)`
  background-color: #3b82f6;
  color: white;
  border: none;

  &:hover {
    background-color: #2563eb;
  }
`;

const CancelButton = styled(Button)`
  background-color: white;
  color: #4b5563;
  border: 1px solid #d1d5db;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export default function EditJob(): React.JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  const [job, setJob] = React.useState<Job | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // In a real app, this would be an API call
    const mockJob: Job = {
      id,
      jobName: "Lot 3",
      clientName: "Cindy McKinny",
      status: "In Progress",
      gateCode: "4729",
      notes: "",
      tasks: [
        "Install new filter",
        "Check water chemistry",
        "Clean pool",
        "Check equipment",
      ],
    };
    setJob(mockJob);
    setLoading(false);
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!job) return;
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!job) return;
    const { name, value } = e.target;
    setJob({ ...job, [name]: value as JobStatus });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    router.push("/jobs");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <Container>
      <BackLink onClick={() => router.back()}>
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Jobs
      </BackLink>
      <Title>Edit Job</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="jobName">Job Name</Label>
          <Input
            type="text"
            id="jobName"
            name="jobName"
            value={job.jobName}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="clientName">Client Name</Label>
          <Input
            type="text"
            id="clientName"
            name="clientName"
            value={job.clientName}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="status">Status</Label>
          <Select
            id="status"
            name="status"
            value={job.status}
            onChange={handleSelectChange}
          >
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Overdue">Overdue</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="gateCode">Gate Code</Label>
          <Input
            type="text"
            id="gateCode"
            name="gateCode"
            value={job.gateCode}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="notes">Notes</Label>
          <TextArea
            id="notes"
            name="notes"
            value={job.notes}
            onChange={handleInputChange}
          />
        </FormGroup>
        <ButtonContainer>
          <CancelButton type="button" onClick={() => router.back()}>
            Cancel
          </CancelButton>
          <SaveButton type="submit">Save Changes</SaveButton>
        </ButtonContainer>
      </Form>
    </Container>
  );
}
