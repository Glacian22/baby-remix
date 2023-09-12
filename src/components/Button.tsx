import { Link } from 'react-router-dom';
import "./button.scoped.css"

interface buttonProps {
  to?: String;
  children?: String;
}

const Button = ({to, children}: buttonProps) => {

  return (
    <Link to={"/" + to} className="button-comp">
      {children}
    </Link>
  )
}

export default Button