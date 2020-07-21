import React from "react";

const OptionPrivate = ({ name, checked, handleOnChange }) => {
  return (
    <div className="privacy">
      <label> Private: </label>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default OptionPrivate;
