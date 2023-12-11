import { Link } from 'react-router-dom';
import "./button.scoped.css"

interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  to?: String;
  variant?: 'square' | 'round';
  children?: String;
}

const Button = ({to, variant, children}: buttonProps) => {

  return (
    <Link to={"/" + to} className={variant === 'square' ? 'sqr-btn' : 'button-comp'}>
      {children}
    </Link>
  )
}

export default Button