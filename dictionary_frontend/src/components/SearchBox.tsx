import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import { useState } from "react";

interface SearchBoxProps {
  searchMode: number;
}

const SearchBox = ({ searchMode }: SearchBoxProps) => {
  const [searchedWord, setSearchedWord] = useState("");
  const [isSearched, setIsSearched] = useState(false); // used to prompt the child component about a search request

  return (
    <div
      className="container-fluid text-center p-3 front-layer"
      style={{ backgroundColor: "grey" }}
    >
      <SearchBar
        setSearchedWord={setSearchedWord}
        setIsSearched={setIsSearched}
      />
      <SearchResult
        isSearched={isSearched}
        setIsSearched={setIsSearched}
        searchedWord={searchedWord}
        searchMode={searchMode}
      />
    </div>
  );
};

export default SearchBox;
