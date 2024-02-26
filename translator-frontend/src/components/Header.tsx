interface HeaderProps {
    value: string;
}

const Header = ({value}: HeaderProps) => {
  return (
    <h1 className='default-header'>{value}</h1>
  )
}

export default Header;