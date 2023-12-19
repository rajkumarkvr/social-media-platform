import { useState } from "react";
import "./alert.css";
const Alert = ({ children, varient ,className}) => {
  
  const handleVisibility = () => {
    setShow(prev=>!prev);
  };
  return (
    <>
   
        <div className={`alert alert-${varient} ${className}`}>
          {children}
        </div>
      
    </>
  );
};

export default Alert;
