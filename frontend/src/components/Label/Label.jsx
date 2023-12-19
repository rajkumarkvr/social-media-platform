import "./label.css";

const Label = ({ children, fontSize, display ,className,varient,color}) => {
  return (
    <label className={`${varient} ${className}`} style={{color:color,fontSize: fontSize, display: display }}>
      {children}
    </label>
  );
};

Label.defaultProps = {
  children: "text",
  fontSize: "18px",
  display: "inline-block",
  varient:"black"
};

export default Label;
