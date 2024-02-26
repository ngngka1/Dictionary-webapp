import Header from "./Header";
import Button from "./Button";
import imageSrc from "../assets/search_icon.png";

interface OptionBoxProps {
  header: string;
  description: string;
  action: () => void;
}

const OptionBox = ({ header, description, action }: OptionBoxProps) => {
  const boxStyle = {
    padding: "20px",
    backgroundColor: "grey",
    borderRadius: "20px",
    overflow: "hidden",
  };
  return (
    <div style={boxStyle}>
      <Header value={header} />
      <p style={{ textAlign: "center" }}>{description}</p>
      <Button action={action} imageSrc={imageSrc}></Button>
    </div>
  );
};

export default OptionBox;
