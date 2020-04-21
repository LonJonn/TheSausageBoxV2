import React from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";
import styled from "styled-components";

const NavItem = styled.li`
  display: flex;
`;

const NavLink = styled(RouterLink)<LinkProps>`
  padding: 1.25rem 1rem;
  text-decoration: none;
  color: var(--text);

  transition-duration: 0.2s;

  &:hover {
    text-decoration: underline;
    color: var(--color-primary);
  }
`;

export const Link: React.FC<LinkProps> = ({ children, ...restProps }) => (
  <NavItem>
    <NavLink {...restProps}>{children}</NavLink>
  </NavItem>
);
