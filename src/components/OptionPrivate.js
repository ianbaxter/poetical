import React from "react";

const OptionPrivate = ({ name, handleChecked, handleOnChange }) => {
  return (
    <div className="privacy">
      <label> Private: </label>
      <input
        type="checkbox"
        name={name}
        checked={handleChecked}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default OptionPrivate;
