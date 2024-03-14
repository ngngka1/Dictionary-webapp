import SearchBox from "../components/SearchBox";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const SEARCH_OPTIONS = ["dictionary", "thesaurus", "translator"];

interface SearchPageProps {
  mode: 0 | 1 | 2 | number;
}

const SearchPage = ({ mode }: SearchPageProps) => {
  const navigate = useNavigate();
  const navigatePage = (url: string) => {
    navigate(url);
  };

  return (
    <div>
      <Header value={SEARCH_OPTIONS[mode]} />
      <div className="container front-layer p-5">
        <h3 style={{ textAlign: "center" }}>Other tools:</h3>
        <div className="d-flex flex-row justify-content-center gap-5">
          {SEARCH_OPTIONS.map((value: string) => (
            <div className="flex-grow-1">
              <Button
                text={value}
                className="light"
                buttonWidth="100%"
                action={() => {
                  navigatePage("/" + value);
                }}
              />
            </div>
          ))}
        </div>
        <div className="row mt-5">
          <SearchBox searchMode={mode} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
