"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;

const StyledLink = styled(Link)`
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;

export default function Home(): React.JSX.Element {
  return (
    <Container>
      <Title>Athena Pools Task Scheduler</Title>
      <StyledLink href="/jobs">View Jobs</StyledLink>
    </Container>
  );
}
