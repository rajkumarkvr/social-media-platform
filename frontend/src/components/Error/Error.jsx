import "./error.css";
const Error = ({children,className}) => {
  return (
    <div className={`error-info ${className}`}>
        {children}
    </div>
  )
}

Error.defaultProps={
    children:"Error",
    className:""
}

export default Error