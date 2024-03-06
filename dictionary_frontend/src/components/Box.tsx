import Header from "./Header";
import Button from "./Button";

interface BoxProps {
  header: string;
  content: string | JSX.Element;
  action?: () => void | null;
  actionButtonText?: string;
  actionButtonImageSrc?: string;
  boxStyle?: { [key: string]: string };
}

const Box = ({
  header,
  content,
  action,
  actionButtonText,
  actionButtonImageSrc,
  boxStyle,
}: BoxProps) => {
  const defaultBoxStyle = {
    padding: "20px",
    backgroundColor: "grey",
    borderRadius: "20px",
    overflow: "hidden",
  };

  return (
    <div style={Object.assign(defaultBoxStyle, boxStyle)}>
      <Header value={header} />
      <p>{content}</p>
      {action && (
        <Button
          action={action}
          imageSrc={actionButtonImageSrc}
          text={actionButtonText}
        ></Button>
      )}
    </div>
  );
};

Box.defaultProps = {
  action: null,
  actionButtonImageSrc: "",
  actionButtonText: "",
};

export default Box;
