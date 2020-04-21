import styled from "styled-components";
import { IItemsListProps } from "./types";

export const Items = styled.ul<IItemsListProps>`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 1.15rem;

  ${({ end }) => end && `margin-left: auto;`}
`;
