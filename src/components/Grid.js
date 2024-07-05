import React from "react";
import Cell from "./Cell";
import "./Grid.css";

const Grid = ({ grid, onCellChange, fixedCells }) => {
  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((value, colIndex) => (
            <Cell
              key={colIndex}
              value={value}
              rowIndex={rowIndex}
              colIndex={colIndex}
              onCellChange={onCellChange}
              fixed={fixedCells[rowIndex][colIndex]}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
