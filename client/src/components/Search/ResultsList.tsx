import React, { useContext } from "react";
import { searchContext } from ".";
import { ISearchResult } from "./types";
import { Link } from "react-router-dom";
import styled from "styled-components";

/**
 * Individual Search Item
 */
const PreviewContainer = styled.div`
  max-width: 20%;
  background-color: var(--surface);
  border-radius: 0.35rem;
  overflow: hidden;
  margin-right: 1rem;

  * {
    text-decoration: none;
  }
`;
const PreviewImage = styled.img`
  width: 100%;
`;

const PreviewContent = styled.div`
  padding: 1rem;
`;

const PreviewTitle = styled.h1`
  margin: 0 0 1rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text);

  .slug {
    margin-top: 0.25rem;
    font-size: 0.9rem;
    font-weight: 400;
    color: var(--text-secondary);
  }
`;

const PreviewText = styled.p`
  margin: 0;
  color: var(--text-secondary);

  p {
    margin: 0 0 0.5rem;
  }

  b {
    font-weight: 500;
  }
`;

interface IPreviewProps {
  result: ISearchResult;
}
const Preview: React.FC<IPreviewProps> = ({ result }) => {
  return (
    <PreviewContainer>
      <Link to={`/shows/${result.slug}`}>
        <PreviewImage
          src={`https://image.tmdb.org/t/p/w500/${result.backdrop}`}
        />
        <PreviewContent>
          <PreviewTitle>
            {result.title}
            <p className="slug">{result.slug}</p>
          </PreviewTitle>
          <PreviewText>
            <p>
              <b>Released:</b> {result.year}
            </p>
            <p>
              <b>Duration:</b> {result.duration}
            </p>
          </PreviewText>
        </PreviewContent>
      </Link>
    </PreviewContainer>
  );
};

const ResultsContainer = styled.div`
  display: flex;
`;

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
      <ResultsContainer>
        {results.map((result, idx) => (
          <Preview result={result} key={idx} />
        ))}
      </ResultsContainer>
    </div>
  );
};
