import SearchBox from "../components/SearchBox";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const SEARCH_OPTIONS = ["dictionary", "thesaurus", "translator"];

interface TranslatorPageProps {
  mode: 0 | 1 | 2 | number;
}

const TranslatorPage = ({ mode }: TranslatorPageProps) => {
  const navigate = useNavigate();
  const navigatePage = (url: string) => {
    navigate(url);
  };

  return (
    <div>
      <Header value={SEARCH_OPTIONS[mode]} />
      <div className="container front-layer p-5">
        <p style={{ textAlign: "center" }}>Other tools:</p>
        <div className="row text-center">
          <div className="col-4">
            <Button
              text={SEARCH_OPTIONS[0]}
              className="primary"
              action={() => {
                navigatePage("/" + SEARCH_OPTIONS[0]);
              }}
            />
          </div>
          <div className="col-4">
            <Button
              text={SEARCH_OPTIONS[1]}
              className="primary"
              action={() => {
                navigatePage("/" + SEARCH_OPTIONS[1]);
              }}
            />
          </div>
          <div className="col-4">
            <Button
              text={SEARCH_OPTIONS[2]}
              className="primary"
              action={() => {
                navigatePage("/" + SEARCH_OPTIONS[2]);
              }}
            />
          </div>
        </div>
        <div className="row mt-5">
          <SearchBox searchMode={mode} />
        </div>
      </div>
    </div>
  );
};

export default TranslatorPage;
