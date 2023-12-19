import "./loader.css"

const Loader = ({className,align}) => {
  return (
    <div className={`loader ${className} ${align}`}></div>
  )
}
Loader.defaultProps={
  className:"",
  align:"center"
}
export default Loader