import Header from "../components/Header";
import Box from "../components/Box";
import { useNavigate } from "react-router-dom";
import searchIconSrc from "../assets/search_icon.png";

const HomePage = () => {
  const navigate = useNavigate();
  const navigatePage = (url: string) => {
    navigate(url);
  };

  const optionBoxDivStyle = {
    minHeight: "300px",
    display: "flex",
    alignItems: "stretch",
  };

  return (
    <div>
      <div className="container-lg">
        <Header value="Online Learner Dictionary" />
        <div className="container text-center front-layer p-5">
          {/* the light white rectangle surrounding options */}
          <div className="row align-items-center">
            <div className="col-3 offset-md-2 " style={optionBoxDivStyle}>
              <Box
                header="Dictionary"
                content="Look up the meanings and example sentences of the word"
                action={() => {
                  navigatePage("/dictionary");
                }}
                actionButtonImageSrc={searchIconSrc}
              />
            </div>
            <div className="col-3 offset-md-2" style={optionBoxDivStyle}>
              <Box
                header="Thesaurus"
                content="Find the synonyms and antonyms of a word"
                action={() => {
                  navigatePage("/thesaurus");
                }}
                actionButtonImageSrc={searchIconSrc}
              />
            </div>
          </div>
          <div className="row align-items-center">
            <div className="mt-5 col-3 offset-md-2" style={optionBoxDivStyle}>
              <Box
                header="Translator"
                content="Translate the English word into your own language"
                action={() => {
                  navigatePage("/translator");
                }}
                actionButtonImageSrc={searchIconSrc}
              />
            </div>
            <div className="mt-5 col-3 offset-md-2" style={optionBoxDivStyle}>
              <Box
                header="Word quiz"
                content="Test your vocabulary knowledge with tests"
                action={() => {
                  navigatePage("/quiz");
                }}
                actionButtonImageSrc={searchIconSrc}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
