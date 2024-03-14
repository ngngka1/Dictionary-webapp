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
  return (
    <div className="box" style={boxStyle}>
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
