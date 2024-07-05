import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./components/App";
import Home from "./components/Home";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sudoku" element={<App />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
