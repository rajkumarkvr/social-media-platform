import "./button.css"
const Button = ({children,varient,className,onClick,hidden}) => {
  return (
    <button className={`btn btn-${varient} ${className}`} onClick={onClick} hidden={hidden}>{children}</button>
  )
}

Button.defaultProps={
  varient:"primary",
  label:"Sample",
  onClick:()=>{}
}
export default Button