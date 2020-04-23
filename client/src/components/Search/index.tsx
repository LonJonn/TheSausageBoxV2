import React, { useState, createContext } from "react";
import {
  IAppSearch,
  ISearchContext,
  ISearchResponse,
  ISearchResult,
} from "./types";
import axios from "axios";

/**
 * Import compound components
 */
import { Input } from "./Input";
import { Button } from "./Button";
import { ResultsList } from "./ResultsList";

/**
 * Compount Component Context
 */
export const searchContext = createContext<ISearchContext>({
  loading: false,
  query: "",
  setQuery: () => {},
  total: 0,
  results: [],
});
const { Provider } = searchContext;

/**
 * Main component.
 * All logic is held here.
 */
const Search: IAppSearch = (props) => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [total, setTotal] = useState(0);
  const [results, setResults] = useState<ISearchResult[]>([]);

  async function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const url = `http://localhost:3000/api/shows/search?query=${query}`;
      const searchData = (await axios.get(url)).data as ISearchResponse;
      const { total: totalResults, result: searchResults } = searchData;

      setTotal(totalResults);
      setResults(searchResults);
    } catch (error) {
      const errorMsg = error.response.data;

      alert("Unable to search!\n" + errorMsg);
    }

    setLoading(false);
  }

  return (
    <Provider
      value={{
        loading,
        query,
        setQuery,
        total,
        results,
      }}
    >
      <form name="search" onSubmit={submitSearch}>
        {props.children}
      </form>
    </Provider>
  );
};

/**
 * Assign compound components
 */
Search["Input"] = Input;
Search["Button"] = Button;
Search["ResultsList"] = ResultsList;

export default Search;
