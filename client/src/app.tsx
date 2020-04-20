import React from "react";
import reactDOM from "react-dom";

import Search from "./components/Search";

import "./app.scss";

const appEl = document.getElementById("app");

const App: React.FC = () => (
  <React.StrictMode>
    <h1>Numbero Uno</h1>
    <Search>
      <Search.Input />
      <Search.Button />

      <br />
      <h2>Results</h2>
      <Search.Results />
    </Search>
  </React.StrictMode>
);

reactDOM.render(<App />, appEl);
