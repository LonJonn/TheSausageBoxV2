import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: var(--color-primary);
  padding: 1rem;
`;

export const Button: React.FC = () => {
  return <StyledButton type="submit">Search</StyledButton>;
};
