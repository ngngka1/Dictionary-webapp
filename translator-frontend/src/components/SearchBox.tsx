import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
// import Button from "./Button";
import { useState } from "react";

const SearchBox = () => {
  const [searchedWord, setSearchedWord] = useState("");

  return (
    <div
      className="container-fluid text-center p-3 front-layer"
      style={{ backgroundColor: "grey" }}
    >
      <SearchBar setSearchedWord={setSearchedWord} />
      <SearchResult searchedWord={searchedWord} />
    </div>
  );
};

export default SearchBox;
