import Header from "../components/Header";
import Box from "../components/Box";
import { useNavigate } from "react-router-dom";
import searchIconSrc from "../assets/search_icon.png";

const HomePage = () => {
  const navigate = useNavigate();
  const navigatePage = (url: string) => {
    navigate(url);
  };


  const boxDivStyle = {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-evenly",
    gap: "100px",
    padding: "100px",
  };

  const optionBoxDivStyle = {
    textAlign: "center",
    flex: "1 0 40%",
  };

  return (
    <div>
      <div className="container-lg">
        <Header value="Online Learner Dictionary" />
        <div className="container front-layer" style={boxDivStyle}>
          {/* the light white rectangle surrounding options */}
          <Box
            header="Dictionary"
            content="Look up the meanings and example sentences of the word"
            action={() => {
              navigatePage("/dictionary");
            }}
            actionButtonImageSrc={searchIconSrc}
            boxStyle={optionBoxDivStyle}
          />
          <Box
            header="Thesaurus"
            content="Find the synonyms and antonyms of a word"
            action={() => {
              navigatePage("/thesaurus");
            }}
            actionButtonImageSrc={searchIconSrc}
            boxStyle={optionBoxDivStyle}
          />
          <Box
            header="Translator"
            content="Translate the English word into your own language"
            action={() => {
              navigatePage("/translator");
            }}
            actionButtonImageSrc={searchIconSrc}
            boxStyle={optionBoxDivStyle}
          />
          <Box
            header="Word quiz"
            content="Test your vocabulary knowledge with tests"
            action={() => {
              navigatePage("/word-quiz");
            }}
            actionButtonImageSrc={searchIconSrc}
            boxStyle={optionBoxDivStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
