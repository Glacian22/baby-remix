import { Link } from 'react-router-dom';
import "./button.scoped.css"

interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  to?: String;
  variant?: 'square' | 'round';
  nav?: Boolean;
  children?: String;
}

const Button = ({to, variant, nav=true, children, ...rest}: buttonProps) => {


  return (
    !nav ?
    <button className={variant === 'square' ? 'sqr-btn' : 'button-comp'} {...rest}>
      {children}
    </button>
    :
    <Link to={"/" + to} className={variant === 'square' ? 'sqr-btn' : 'button-comp'}>
      {children}
    </Link>
  )
}

export default Button