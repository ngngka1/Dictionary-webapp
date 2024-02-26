import { useEffect, useState } from "react";

const baseUrl = "http://127.0.0.1:8000/";

interface SearchResultProps {
  searchedWord: string | "";
  searchMode: number;
}

const convertCamelCase = (variableName: string) => {
  let separatedName = variableName.replace(/([A-Z])/g, " $1");
  separatedName =
    separatedName.charAt(0).toUpperCase() + separatedName.slice(1);
  return separatedName;
};

const SearchResult = ({ searchedWord, searchMode }: SearchResultProps) => {
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
    if (searchedWord) {
      fetchData(
        baseUrl + "translator/search/" + searchedWord + "/" + String(searchMode)
      ).then(() => {
        setIsResolved(true);
      });
    }
  }, [searchedWord]); // if searchedWord changed

  return (
    <>
      {searchedWord ? (
        isResolved ? (
          <>
            {Object.entries(searchResult).map(([key, list]) => (
              <div key={key}>
                <h1>{convertCamelCase(key)}</h1>
                <div>
                  {list.map((item: string, index: number) => {
                    return (
                      <ul key={index + 1}>
                        {index + 1}: {item}
                      </ul>
                    );
                  })}
                </div>
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
