import React from "react";
import "./selectbox.css";
const SelectBox = ({value, name, options, initial, className, onChange ,border}) => {
  return (
    <select value={value} className={`select-box ${className} ${border}`} name={name}>
      <option hidden>{initial}</option>
      {options.map((opt, index) => {
        return (
          <option onClick={onChange} key={index} value={opt.toLowerCase()}>
            {opt}
          </option>
        );
      })}
    </select>
  );
};
SelectBox.defaultProps = {
  initial: "Choose item",
  options: ["option1", "option2", "option3"],
  onChange: () => {},
  name: "",
  className: "",
};

export default SelectBox;
