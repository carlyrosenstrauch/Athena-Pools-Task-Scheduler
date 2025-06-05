"use client";

import React from "react";
import Link from "next/link";
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

interface StatusDotProps {
  color: string;
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

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #3b82f6;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 42rem;

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

const JobsContainer = styled.div`
  width: 100%;
  max-width: 42rem;
`;

const JobCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const JobItem = styled.div`
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const JobInfo = styled.div`
  flex: 1;
`;

const JobTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
`;

const JobText = styled.p`
  color: #4b5563;
`;

const StatusDot = styled.span<StatusDotProps>`
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background-color: ${(props: StatusDotProps) => props.color};
  margin-right: 0.5rem;
`;

const StatusText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ActionButton = styled(Link)`
  padding: 0.5rem 1rem;
  color: white;
  border-radius: 0.25rem;
  text-align: center;
  transition: background-color 0.2s;
`;

const ViewTasksButton = styled(ActionButton)`
  background-color: #3b82f6;
  &:hover {
    background-color: #2563eb;
  }
`;

const EditButton = styled(ActionButton)`
  background-color: #6b7280;
  &:hover {
    background-color: #4b5563;
  }
`;

const AddJobButton = styled(Link)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: #22c55e;
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 50;
  transition: background-color 0.2s;

  &:hover {
    background-color: #16a34a;
  }
`;

export default function Jobs(): React.JSX.Element {
  const jobs: Job[] = [
    {
      id: "1",
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
    },
    {
      id: "2",
      jobName: "Monthly Maintenance - Smith Family Pool",
      clientName: "Sarah Smith",
      status: "Scheduled",
      gateCode: "",
      notes: "",
      tasks: ["Monthly cleaning", "Check water levels", "Test chemicals"],
    },
    {
      id: "3",
      jobName: "Emergency Repair - Wilson Pool",
      clientName: "Mike Wilson",
      status: "Overdue",
      gateCode: "",
      notes: "",
      tasks: ["Replace pump", "Check electrical connections", "Test system"],
    },
  ];

  const statusColors: Record<JobStatus, string> = {
    Scheduled: "#3b82f6",
    "In Progress": "#eab308",
    Completed: "#22c55e",
    Overdue: "#ef4444",
  };

  return (
    <Container>
      <BackLink href="/">
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
        Return to Front Page
      </BackLink>
      <Title>Jobs</Title>
      <JobsContainer>
        <JobCard>
          {jobs.map((job) => (
            <JobItem key={job.id}>
              <JobInfo>
                <JobTitle>{job.jobName}</JobTitle>
                <JobText>Client: {job.clientName}</JobText>
                <JobText>Gate Code: {job.gateCode}</JobText>
                <JobText>Notes: {job.notes}</JobText>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "0.5rem",
                  }}
                >
                  <StatusDot color={statusColors[job.status]} />
                  <StatusText>{job.status}</StatusText>
                </div>
                <JobText style={{ marginTop: "0.5rem", cursor: "pointer" }}>
                  Click to view attachments
                </JobText>
              </JobInfo>
              <ButtonContainer>
                <ViewTasksButton href={`/jobs/${job.id}/tasks`}>
                  View Tasks
                </ViewTasksButton>
                <EditButton href={`/jobs/${job.id}/edit`}>Edit Job</EditButton>
              </ButtonContainer>
            </JobItem>
          ))}
        </JobCard>
      </JobsContainer>

      <AddJobButton href="/add-job">Add New Job</AddJobButton>
    </Container>
  );
}
