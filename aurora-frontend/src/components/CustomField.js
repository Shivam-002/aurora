import React from "react";
import "./CustomField.css";

function CustomField({prop}) {


  return (
    <div className="custom-field" style={{ width: prop.width }}>
      <div className="hint-container">
        <p className="field-hint">{prop.hint}*</p>
        {prop.error != '' && <p className="error-hint">{prop.error}</p>}
   </div>
      <input
        type={prop.input_type}
        className="custom-field-input"
        onChange={prop.onInputChanged}
      />
    </div>
  );
}

export default CustomField;
