import React, { useState } from "react";
import logo from "./logo.svg";
import TopNavBar from "./components/Navbar/TopNavBar";
import Login from "./views/pages/Login/Login";
import Home from "./views/pages/Home/Home";
import FlightTicket from "./components/FlightTicket/FlightTicket";
import User from "./views/pages/User/User";

function App() {
  return (
    <div className="App">
      <User />
    </div>
  );
}

export default App;
