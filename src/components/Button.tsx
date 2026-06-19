import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import "./button.scoped.css"

interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  to?: string;
  variant?: 'square' | 'round';
  nav?: boolean;
  children?: ReactNode;
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