import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import { solveSudoku, generateRandomSudoku } from "../solver";
import "../App.css";

const App = () => {
  const [grid, setGrid] = useState(null);
  const [fixedCells, setFixedCells] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [hintCount, setHintCount] = useState(5);

  useEffect(() => {
    handleNewGame(selectedDifficulty);
  }, [selectedDifficulty]);

  const handleCellChange = (row, col, value) => {
    const newGrid = grid.map((row) => row.slice());
    newGrid[row][col] = value;
    setGrid(newGrid);
  };

  const handleSolve = () => {
    const solvedGrid = solveSudoku(grid);
    setGrid(solvedGrid);
  };

  const handleNewGame = (difficulty) => {
    let numFixedCells;
    switch (difficulty) {
      case "easy":
        numFixedCells = 60;
        break;
      case "medium":
        numFixedCells = 50;
        break;
      case "hard":
        numFixedCells = 42;
        break;
      default:
        numFixedCells = 60; // Default to easy
        break;
    }

    const { grid: newGrid, fixedCells } = generateRandomSudoku(numFixedCells);
    setGrid(newGrid);
    setFixedCells(fixedCells);
    setHintCount(5); // Reset hint count on new game
  };

  const handleHint = () => {
    if (hintCount > 0) {
      const unfixedCells = [];
      grid.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
          if (!fixedCells[rowIndex][colIndex] || value === "") {
            unfixedCells.push({ row: rowIndex, col: colIndex });
          }
        });
      });

      if (unfixedCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * unfixedCells.length);
        const { row, col } = unfixedCells[randomIndex];
        const solvedGrid = solveSudoku(grid);
        const correctValue = solvedGrid[row][col];

        // Update grid with the correct value
        const newGrid = grid.map((row) => row.slice());
        newGrid[row][col] = correctValue;
        setGrid(newGrid);

        // Update hint count
        setHintCount((prevCount) => prevCount - 1);
      }
    }
  };

  return (
    <div className="App">
      <h1>SolverSudoku</h1>
      <div className="controls">
        <select
          id="difficulty"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button onClick={() => handleNewGame(selectedDifficulty)}>
          New Game
        </button>
        <button onClick={handleSolve}>Solve</button>
        <button onClick={handleHint} disabled={hintCount === 0}>
          Hint ({hintCount})
        </button>
      </div>
      {grid && fixedCells ? (
        <Grid
          grid={grid}
          onCellChange={handleCellChange}
          fixedCells={fixedCells}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
