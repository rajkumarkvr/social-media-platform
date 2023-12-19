import "./textbox.css";
const TextBox = ({type,className,name,onChange,value,border,refs,placeholder}) => {
  return (
    <input placeholder={placeholder} type={type} className={`txt-box ${className} ${border}`} name={name} onChange={onChange} value={value} ref={refs}/>
  )
}

TextBox.defaultProps = {
    type:"text",
    className:"",
    name:"",
    onChange:()=>{},
    value:"",
    border:"",
  
}

export default TextBox