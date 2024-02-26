import Header from "../components/Header";
import OptionBox from "../components/OptionBox";
import { useNavigate } from "react-router-dom";

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
              <OptionBox
                header="Dictionary"
                description="Look up the meanings and example sentences of the word"
                action={() => {
                  navigatePage("/dictionary");
                }}
              />
            </div>
            <div className="col-3 offset-md-2" style={optionBoxDivStyle}>
              <OptionBox
                header="Thesaurus"
                description="Find the synonyms and antonyms of a word"
                action={() => {
                  navigatePage("/thesaurus");
                }}
              />
            </div>
          </div>
          <div className="row align-items-center">
            <div className="mt-5 col-3 offset-md-2" style={optionBoxDivStyle}>
              <OptionBox
                header="Translator"
                description="Translate the English word into your own language"
                action={() => {
                  navigatePage("/translator");
                }}
              />
            </div>
            <div className="mt-5 col-3 offset-md-2" style={optionBoxDivStyle}>
              <OptionBox
                header="Word quiz"
                description="Test your vocabulary knowledge with tests"
                action={() => {
                  navigatePage("/quiz");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
