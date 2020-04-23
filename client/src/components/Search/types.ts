// Compound Component Type Def
export interface IAppSearch extends React.FC {
  Input: React.FC;
  Button: React.FC;
  ResultsList: React.FC;
}

// Search Context
export interface ISearchContext {
  loading: boolean;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  total: number;
  results: ISearchResult[];
}

// Search Results
export interface ISearchResult {
  slug: string;
  title: string;
  description: string;
  duration: string;
  year: string;
  poster: string;
  backdrop: string;
}

export interface ISearchResponse {
  total: number;
  result: ISearchResult[];
}
