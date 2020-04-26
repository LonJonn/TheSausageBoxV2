import { LinkProps } from "react-router-dom";

// Compound Component Type Def
export interface IAppNavbar extends React.FC {
  Title: React.FC;
  Items: React.FC<IItemsListProps>;
  Link: React.FC<LinkProps>;
  // Button: React.FC;
  // Dropdown: React.FC;
}

export interface IItemsListProps {
  end?: "true" | "false";
}
