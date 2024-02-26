import Header from "../components/Header";
import OptionBox from "../components/OptionBox";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const navigatePage = (url: string) => {
    navigate(url);
  };

  return (
    <div>
      <div className="container-lg">
        <Header value="Online Learner Dictionary" />
        <div className="container text-center front-layer pb-3">
          <div className="row align-items-center">
            <div className="mt-3 col-md-3 offset-md-2">
              <OptionBox
                header="Translator"
                description="Look up the meanings and example sentences of the words that you are unfamiliar with"
                action={() => {
                  navigatePage("/translator");
                }}
              />
            </div>
            <div className="mt-3 col-md-3 offset-md-2">
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
            <div className="mt-3 col-md-3 offset-md-2">
              <OptionBox
                header="Word quiz"
                description="Test your vocabulary knowledge with tests"
                action={() => {
                  navigatePage("/quiz");
                }}
              />
            </div>
            <div className="mt-3 col-md-3 offset-md-2">
              <OptionBox
                header="Translator"
                description="None"
                action={() => {
                  navigatePage("/translator");
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
