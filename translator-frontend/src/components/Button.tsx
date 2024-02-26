interface ButtonProps {
  type?: "button" | "submit" | "reset";
  text?: string;
  imageSrc?: string;
  action?: () => void;
}

const Button = ({ action, text, imageSrc, type }: ButtonProps) => {
  const imageStyle = {
    maxWidth: "100%",
    maxheight: "100%",
  };
  const image = <img src={imageSrc} alt={imageSrc} style={imageStyle} />;
  const buttonStyle = {
    maxWidth: "70px",
    maxheight: "70px",
  };
  return (
    <button
      type={type}
      className="btn btn-light"
      onClick={action}
      style={buttonStyle}
    >
      {imageSrc ? image : text}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  text: "",
  imageSrc: "",
  action: () => {
    console.log("No action");
  },
};

export default Button;
