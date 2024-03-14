interface ButtonProps {
  type?: "button" | "submit" | "reset";
  text?: string;
  imageSrc?: string;
  className?: "primary" | "secondary" | "light" | "dark";
  buttonWidth?: string;
  buttonHeight?: string;
  action?: () => void;
}

const Button = ({
  action,
  text,
  imageSrc,
  type,
  className,
  buttonWidth,
  buttonHeight,
}: ButtonProps) => {
  const imageStyle = {
    maxWidth: "70px",
    maxheight: "70px",
  };
  const image = <img src={imageSrc} alt={imageSrc} style={imageStyle} />;
  return (
    <button
      type={type}
      className={"btn btn-" + className}
      onClick={action}
      style={{ width: buttonWidth, height: buttonHeight }}
    >
      {imageSrc ? image : text}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  text: "",
  imageSrc: "",
  buttonWidth: "fit-content",
  buttonHeight: "fit-content",
  className: "light",
  action: () => {},
};

export default Button;
