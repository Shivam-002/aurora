import React from "react";
import "./CustomDropdown.css";

function CustomDropdown({ prop }) {
  return (
    <div className="custom-dropdown" style={{ width: prop.width }}>
      <div className="hint-container">
        <p className="field-hint">{prop.hint}*</p>
      </div>
      <select className="custom-select" onChange={prop.onInputChanged}>
        {prop.options.map((option) => {
          return (
            <option className="custom-option" key={option}value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default CustomDropdown;
