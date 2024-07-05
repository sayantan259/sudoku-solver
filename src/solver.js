const isValid = (board, row, col, c) => {
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === c) return false;
    if (board[row][i] === c) return false;
    if (
      board[3 * Math.floor(row / 3) + Math.floor(i / 3)][
        3 * Math.floor(col / 3) + (i % 3)
      ] === c
    )
      return false;
  }
  return true;
};

const solve = (board) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === "") {
        for (let c = 1; c <= 9; c++) {
          const char = c.toString();
          if (isValid(board, i, j, char)) {
            board[i][j] = char;
            if (solve(board)) return true;
            else board[i][j] = "";
          }
        }
        return false;
      }
    }
  }
  return true;
};

export const solveSudoku = (grid) => {
  const gridCopy = grid.map((row) => row.slice());
  solve(gridCopy);
  return gridCopy;
};

const generateFullGrid = () => {
  const board = Array(9)
    .fill()
    .map(() => Array(9).fill(""));
  solve(board);
  return board;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const shuffleGrid = (grid) => {
  const shuffledGrid = grid.map((row) => row.slice());

  // Shuffle rows within each 3-row block
  for (let block = 0; block < 3; block++) {
    const rows = [0, 1, 2].map((i) => 3 * block + i);
    shuffleArray(rows);
    for (let i = 0; i < 3; i++) {
      shuffledGrid[3 * block + i] = grid[rows[i]].slice();
    }
  }

  // Shuffle columns within each 3-column block
  for (let block = 0; block < 3; block++) {
    const cols = [0, 1, 2].map((i) => 3 * block + i);
    shuffleArray(cols);
    for (let row = 0; row < 9; row++) {
      const newRow = shuffledGrid[row].slice();
      for (let i = 0; i < 3; i++) {
        newRow[3 * block + i] = grid[row][cols[i]];
      }
      shuffledGrid[row] = newRow;
    }
  }

  // Shuffle numbers
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  shuffleArray(nums);
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      shuffledGrid[row][col] = nums[grid[row][col] - 1].toString();
    }
  }

  return shuffledGrid;
};

const removeCells = (grid, numCellsToRemove) => {
  const gridCopy = grid.map((row) => row.slice());
  const fixedCells = Array(9)
    .fill()
    .map(() => Array(9).fill(false));

  let cellsRemoved = 0;
  while (cellsRemoved < numCellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (gridCopy[row][col] !== "") {
      gridCopy[row][col] = "";
      cellsRemoved++;
    }
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (gridCopy[i][j] !== "") {
        fixedCells[i][j] = true;
      }
    }
  }

  return { grid: gridCopy, fixedCells };
};

export const generateRandomSudoku = (numFixedCells) => {
  const fullGrid = generateFullGrid();
  const shuffledGrid = shuffleGrid(fullGrid);
  const numCellsToRemove = 81 - numFixedCells;
  return removeCells(shuffledGrid, numCellsToRemove);
};
