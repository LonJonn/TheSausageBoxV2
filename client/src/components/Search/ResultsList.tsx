import React, { useContext } from "react";
import { searchContext } from ".";
import { ISearchResult } from "./types";

/**
 * Individual Search Item
 */
interface IPreviewProps {
  result: ISearchResult;
}
const Preview: React.FC<IPreviewProps> = ({ result }) => {
  return (
    <div>
      <h1>{result.title}</h1>
      <p>{result.slug}</p>
      <p>{result.year}</p>
      <img src={`https://image.tmdb.org/t/p/w500/${result.backdrop}`} />
    </div>
  );
};

/**
 * List
 */
export const ResultsList: React.FC = () => {
  const { loading, total, results } = useContext(searchContext);

  if (loading) return <h1>One sec, were finding that for you!</h1>;

  if (total === 0)
    return (
      <div>
        <h1>Oh no</h1>
        <p>Sorry no results...</p>
      </div>
    );

  return (
    <div>
      <p>{total} result(s) found</p>
      {results.map((result, idx) => (
        <Preview result={result} key={idx} />
      ))}
    </div>
  );
};
