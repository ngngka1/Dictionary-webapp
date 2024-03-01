interface ButtonProps {
  type?: "button" | "submit" | "reset";
  text?: string;
  imageSrc?: string;
  className?: "primary" | "secondary" | "light" | "dark";
  action?: () => void;
}

const Button = ({ action, text, imageSrc, type, className }: ButtonProps) => {
  const imageStyle = {
    maxWidth: "70px",
    maxheight: "70px",
  };
  const image = <img src={imageSrc} alt={imageSrc} style={imageStyle} />;
  return (
    <button type={type} className={"btn btn-" + className} onClick={action}>
      {imageSrc ? image : text}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  text: "",
  imageSrc: "",
  className: "light",
  action: () => {
    
  },
};

export default Button;
