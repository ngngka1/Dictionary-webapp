import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import { useState } from "react";

interface SearchBoxProps {
  searchMode: number;
}

const SearchBox = ({searchMode}: SearchBoxProps) => {
  const [searchedWord, setSearchedWord] = useState("");

  return (
    <div
      className="container-fluid text-center p-3 front-layer"
      style={{ backgroundColor: "grey" }}
    >
      <SearchBar setSearchedWord={setSearchedWord} />
      <SearchResult searchedWord={searchedWord} searchMode={searchMode}/>
    </div>
  );
};

export default SearchBox;
