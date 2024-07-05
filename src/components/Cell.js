import React from "react";
//import "./Cell.css";

const Cell = ({ value, rowIndex, colIndex, onCellChange, fixed }) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (
      newValue === "" ||
      (/^[1-9]$/.test(newValue) && newValue.length === 1)
    ) {
      onCellChange(rowIndex, colIndex, newValue);
    }
  };

  return (
    <input
      type="text"
      className="cell"
      value={value}
      onChange={handleChange}
      maxLength="1"
      data-fixed={fixed}
      readOnly={fixed}
    />
  );
};

export default Cell;
