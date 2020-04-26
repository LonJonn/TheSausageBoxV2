import React from "react";
import reactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SearchPage from "./pages/Search";
import Navbar from "./components/Navbar";

import "./styles/app.scss";
import "normalize.css";
import styled from "styled-components";

const appEl = document.getElementById("app");

const Container = styled.main`
  padding: 2rem 1.5rem 0;
`;

const App: React.FC = () => (
  <React.StrictMode>
    <Router>
      <Navbar>
        <Navbar.Title>The Box</Navbar.Title>
        <Navbar.Items>
          <Navbar.Link to="/search">Search</Navbar.Link>
          <Navbar.Link to="/second">Link 2</Navbar.Link>
        </Navbar.Items>
        <Navbar.Items end="true">
          <Navbar.Link to="/about">About</Navbar.Link>
        </Navbar.Items>
      </Navbar>

      <Container>
        <Switch>
          <Route path="/search" component={SearchPage} />
        </Switch>
      </Container>
    </Router>
  </React.StrictMode>
);

reactDOM.render(<App />, appEl);
