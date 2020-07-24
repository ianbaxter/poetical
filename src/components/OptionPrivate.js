import React from "react";

const OptionPrivate = ({ name, checked, handleOnChange }) => {
  return (
    <div className="privacy">
      <label htmlFor="privacy-checkbox"> Private: </label>
      <input
        id="privacy-checkbox"
        type="checkbox"
        name={name}
        checked={checked}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default OptionPrivate;
