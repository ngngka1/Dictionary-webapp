import SearchBox from "../components/SearchBox";
import Header from "../components/Header";

const TranslatorPage = () => {
  return (
    <div>
      <Header value="Translator" />
      <div className="container front-layer">
        <div className="p-5 col">
          <SearchBox />
        </div>
      </div>
    </div>
  );
};

export default TranslatorPage;
