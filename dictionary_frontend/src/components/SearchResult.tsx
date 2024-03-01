import { useEffect, useState } from "react";
import Box from "./Box";

const baseUrl = "http://127.0.0.1:8000/";

interface SearchResultProps {
  isSearched: boolean;
  setIsSearched: (isSearched: boolean) => void;
  searchedWord: string | "";
  searchMode: number;
}

const convertCamelCase = (variableName: string) => {
  let separatedName = variableName.replace(/([A-Z])/g, " $1");
  separatedName =
    separatedName.charAt(0).toUpperCase() + separatedName.slice(1);
  return separatedName;
};

const SearchResult = ({
  isSearched,
  setIsSearched,
  searchedWord,
  searchMode,
}: SearchResultProps) => {
  const [searchResult, setSearchResult] = useState(
    new Map<string, Array<string>>()
  );
  const [isResolved, setIsResolved] = useState(false);

  const fetchData = async (url: string) => {
    let response = await fetch(url);
    let data = await response.json();
    setSearchResult(data);
  };

  useEffect(() => {
    setIsResolved(false);
    if (searchedWord && isSearched) {
      fetchData(
        baseUrl + "translator/search/" + searchedWord + "/" + String(searchMode)
      ).then(() => {
        setIsResolved(true);
      });
    }
    setIsSearched(false); // set the search request false, indicating the search is resolved
  }, [isSearched]); // if the search status changed

  return (
    <>
      {searchedWord ? (
        isResolved ? (
          <>
            {Object.entries(searchResult).map(([key, list]) => (
              <div key={key}>
                <Box
                  header={convertCamelCase(key)}
                  boxStyle={{
                    backgroundColor: "lightgrey",
                    margin: "20px",
                    textAlign: "left",
                  }}
                  content={list.map((item: string, index: number) => {
                    return (
                      <ul key={index + 1}>
                        {index + 1}: {item}
                      </ul>
                    );
                  })}
                />
              </div>
            ))}
          </>
        ) : (
          <p>Loading ...</p>
        )
      ) : (
        <p>(The result will be displayed below after searching)</p>
      )}
    </>
  );
};

export default SearchResult;
