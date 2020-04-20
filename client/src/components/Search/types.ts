// Compound Component Type Def
export interface IAppSearch extends React.FC {
  Input: React.FC;
  Button: React.FC;
  Results: React.FC;
}

// Search Result
export interface IResult {
  name: string;
  slug: string;
  id: number;
}

// Search Context
export interface IContext {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  submitSearch: () => void;
  results: IResult[];
}
