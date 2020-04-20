import React, { useContext } from "react";
import { searchContext } from ".";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: var(--color-primary);
  padding: 1rem;
`;

export const Button: React.FC = () => {
  const { submitSearch } = useContext(searchContext);

  return <StyledButton onClick={submitSearch}>Search</StyledButton>;
};
