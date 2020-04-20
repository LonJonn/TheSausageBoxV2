import React, { useState, createContext } from "react";
import { IAppSearch, IContext, IResult } from "./types";
import axios from "axios";

/**
 * Import compound components
 */
import { Input } from "./Input";
import { Button } from "./Button";
import { Results } from "./Results";

/**
 * Compount Component Context
 */
export const searchContext = createContext<IContext>({
  query: "",
  setQuery: () => {},
  submitSearch: () => {},
  results: [],
});
const { Provider } = searchContext;

/**
 * Main component.
 * All logic is held here.
 */
const Search: IAppSearch = (props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IResult[]>([]);

  async function submitSearch() {
    // const searchRes = await axios.get("https://jsonplaceholder.typicode.com/todos");
    // const results = searchRes.data;

    setResults([
      ...results,
      {
        id: 123,
        name: query,
        slug: "hehe xd",
      },
    ]);
  }

  return (
    <Provider
      value={{
        query,
        setQuery,
        submitSearch,
        results,
      }}
    >
      {props.children}
    </Provider>
  );
};

/**
 * Assign compound components
 */
Search["Input"] = Input;
Search["Button"] = Button;
Search["Results"] = Results;

export default Search;
