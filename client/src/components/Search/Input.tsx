import React, { useContext } from "react";
import { searchContext } from ".";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 0.5rem 0.2rem;
`;

export const Input: React.FC = () => {
  const { query, setQuery } = useContext(searchContext);

  type changeEvent = React.ChangeEvent<{ value: string }>;
  const handleChange = (e: changeEvent) => setQuery(e.target.value);

  return <StyledInput type="text" value={query} onChange={handleChange} />;
};
