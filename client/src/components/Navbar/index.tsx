import React from "react";
import { IAppNavbar } from "./types";
import styled from "styled-components";

/**
 * Import compound components
 */
import { Title } from "./Title";
import { Items } from "./Items";
import { Link } from "./Link";

/**
 * Main component.
 * All logic is held here.
 */
const NavContainer = styled.div`
  width: 100%;
  border-bottom: solid 1px var(--color-primary);
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;

  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem; /* Make responsive */
`;

const Navbar: IAppNavbar = (props) => {
  return (
    <NavContainer>
      <StyledNav>{props.children}</StyledNav>
    </NavContainer>
  );
};

/**
 * Assign compound components
 */
Navbar["Title"] = Title;
Navbar["Items"] = Items;
Navbar["Link"] = Link;

export default Navbar;
