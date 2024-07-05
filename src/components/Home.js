import React from "react";
import { Link } from "react-router-dom";
import sudokuBackground from "./sudoku_background.jpeg";
import "./Home.css";

const Home = () => {
  return (
    <div
      className="home"
      style={{ backgroundImage: `url(${sudokuBackground})` }}
    >
      <div className="content">
        <h1>Welcome to Sudoku Game</h1>
        <Link to="/sudoku">
          <button>Start</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
