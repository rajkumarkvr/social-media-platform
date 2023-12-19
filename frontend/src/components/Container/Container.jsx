import "./container.css";
const Container = ({ children, className, varient }) => {
  return (
    <div className={`flex-container ${varient} ${className}`}>{children}</div>
  );
};
Container.defaultProps = {
  varient: "primary",
  className: "vw-50 vh-50 white column center rounded shadow self-center",
};

export default Container;
