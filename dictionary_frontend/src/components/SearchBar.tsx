import InputField from "./InputField";
import searchIcon from "../assets/search_icon.png";

interface SearchBarProps {
  setSearchedWord: (searchedWord: string) => void;
  setIsSearched: (isSearched: boolean) => void;
}

const SearchBar = ({ setSearchedWord, setIsSearched }: SearchBarProps) => {
  const fieldLabel = "";
  const onSubmitAction = (input: Map<string, string>) => {
    setSearchedWord(String(input.get(fieldLabel)));
    setIsSearched(true);
  };

  return (
    <div className="container-lg">
      <div className="row align-items-center">
        <InputField
          submitButtonImageSrc={searchIcon}
          callback={onSubmitAction}
          fieldlabels={[fieldLabel]}
          fieldtypes={["text"]}
        />
      </div>
    </div>
  );
};

export default SearchBar;
