import SearchBox from "../components/SearchBox";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const SEARCH_OPTIONS = ["dictionary", "thesaurus"];

interface TranslatorPageProps {
  mode: 0 | 1 | number;
}

const TranslatorPage = ({ mode }: TranslatorPageProps) => {
  const navigate = useNavigate();
  const navigatePage = (url: string) => {
    navigate(url);
  };

  return (
    <div>
      <Header value={SEARCH_OPTIONS[mode]} />
      <div className="container front-layer">
        <div className="p-5 col text-center">
          {/* p-5: padding between grey and white rectangle */}
          <div className="row">
            <Button
              text={"Switch to use " + SEARCH_OPTIONS[mode ^ 1]}
              className="primary"
              action={() => {
                navigatePage("/" + SEARCH_OPTIONS[mode ^ 1]);
              }}
            />
          </div>
          <div className="row mt-5">
            <SearchBox searchMode={mode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslatorPage;
