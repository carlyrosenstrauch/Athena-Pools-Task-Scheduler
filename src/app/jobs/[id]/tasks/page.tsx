"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  notes: string;
}

interface Job {
  id: string;
  jobName: string;
  clientName: string;
  status: string;
  gateCode: string;
  notes: string;
  tasks: Task[];
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

const TasksContainer = styled.div`
  width: 100%;
  max-width: 42rem;
`;

const JobCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const JobInfo = styled.div`
  margin-bottom: 1.5rem;
`;

const JobTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const JobText = styled.p`
  color: #4b5563;
  margin-bottom: 0.5rem;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TaskItem = styled.div`
  background-color: #f9fafb;
  border-radius: 0.375rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TaskInfo = styled.div`
  flex: 1;
`;

const TaskTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const TaskDescription = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const TaskMeta = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

const TaskStatus = styled.span<{ completed: boolean }>`
  color: ${(props) => (props.completed ? "#22c55e" : "#ef4444")};
  font-weight: 500;
`;

const AddTaskButton = styled(Link)`
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

export default function JobTasks(): React.JSX.Element {
  const [job, setJob] = React.useState<Job | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // In a real app, this would be an API call
    const mockJob: Job = {
      id: "1",
      jobName: "Lot 3",
      clientName: "Cindy McKinny",
      status: "In Progress",
      gateCode: "4729",
      notes: "",
      tasks: [
        {
          id: "1",
          title: "Install new filter",
          description: "Replace the old filter with a new one",
          completed: false,
          dueDate: "2024-03-20",
          notes: "Make sure to check compatibility",
        },
        {
          id: "2",
          title: "Check water chemistry",
          description: "Test and balance pool water",
          completed: true,
          dueDate: "2024-03-19",
          notes: "All levels are good",
        },
        {
          id: "3",
          title: "Clean pool",
          description: "Vacuum and skim the pool",
          completed: false,
          dueDate: "2024-03-21",
          notes: "",
        },
      ],
    };
    setJob(mockJob);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <Container>
      <BackLink href="/jobs">
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
      <Title>Tasks for {job.jobName}</Title>
      <TasksContainer>
        <JobCard>
          <JobInfo>
            <JobTitle>{job.jobName}</JobTitle>
            <JobText>Client: {job.clientName}</JobText>
            <JobText>Gate Code: {job.gateCode}</JobText>
            <JobText>Notes: {job.notes}</JobText>
          </JobInfo>
          <TaskList>
            {job.tasks.map((task) => (
              <TaskItem key={task.id}>
                <TaskInfo>
                  <TaskTitle>{task.title}</TaskTitle>
                  <TaskDescription>{task.description}</TaskDescription>
                  <TaskMeta>
                    <TaskStatus completed={task.completed}>
                      {task.completed ? "Completed" : "Pending"}
                    </TaskStatus>
                    <span>Due: {task.dueDate}</span>
                    {task.notes && <span>Notes: {task.notes}</span>}
                  </TaskMeta>
                </TaskInfo>
              </TaskItem>
            ))}
          </TaskList>
        </JobCard>
      </TasksContainer>

      <AddTaskButton href={`/jobs/${job.id}/tasks/new`}>
        Add New Task
      </AddTaskButton>
    </Container>
  );
}
