interface HeaderProps {
  value: string;
}

const Header = ({ value }: HeaderProps) => {
  return (
    <>
      <h1 className="default-header">
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </h1>
      <br></br>
    </>
  );
};

export default Header;
