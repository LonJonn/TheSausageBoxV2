import React, { useContext } from "react";
import { searchContext } from ".";

export const Results: React.FC = () => {
  const { results } = useContext(searchContext);

  if (results.length === 0)
    return (
      <div>
        <h1>Oh no</h1>
        <p>Sorry no results...</p>
      </div>
    );

  return (
    <div>
      {results.map((result, idx) => (
        <div key={idx}>
          <h1>{result.name}</h1>
          <h3>{result.id}</h3>
          <p>{result.slug}</p>
        </div>
      ))}
    </div>
  );
};
