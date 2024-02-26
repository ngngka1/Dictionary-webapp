import React, { useState } from "react";
import Button from "./Button";
import searchIcon from "../assets/search_icon.png";

interface SearchBarProps {
  setSearchedWord: (searchedWord: string) => void;
}

const SearchBar = ({ setSearchedWord }: SearchBarProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (event: any) => {
    // modify type later
    event.preventDefault();
    setSearchedWord(input);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <div className="container-lg">
      <div className="row align-items-center">
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-row align-items-center "
        >
          <div className="col-6 offset-3">
            <input
              type="text"
              className="form-control"
              placeholder="Word"
              aria-describedby="basic-addon1"
              value={input}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <Button type="submit" imageSrc={searchIcon} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
