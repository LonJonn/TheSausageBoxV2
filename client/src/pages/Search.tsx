import React from "react";
import Search from "../components/Search";

const SearchPage: React.FC = () => {
  return (
    <React.Fragment>
      <h1>Numbero Uno</h1>
      <Search>
        <Search.Input />
        <Search.Button />

        <br />
        <h2>Results</h2>
        <Search.Results />
      </Search>
    </React.Fragment>
  );
};

export default SearchPage;
