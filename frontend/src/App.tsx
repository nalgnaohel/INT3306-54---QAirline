import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import Home from "./views/pages/Home/Home";
import FlightProcedure from "./views/pages/FlightProcedure/FlightProcedure";

const App = () => {
  return (
    // Đảm bảo BrowserRouter bọc toàn bộ ứng dụng
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
