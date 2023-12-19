import "./p.css";
const P = ({children,varient,className,fontSize}) => {
  return (
    <p style={{fontSize:fontSize}} className={`p-${varient} ${className}`}>{children}</p>
  )
}
P.defaultProps={
    className:"",
    varient:"primary"
}
export default P