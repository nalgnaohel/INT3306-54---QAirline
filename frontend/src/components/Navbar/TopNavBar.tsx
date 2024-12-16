import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./navbar.css";

// Navbar at the top of the app
const TopNavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        ✈️ Airline
      </div>
      <ul className="navbar-ul">
        <li
          className={location.pathname === "/" ? "active" : ""}
          onClick={() => navigate("/")}
        >
          Trang chủ
        </li>
        <li>Trợ giúp</li>
        <li
          className={location.pathname === "/login" ? "active" : ""}
          onClick={() => navigate("/login")}
        >
          Đăng nhập
        </li>
        <li
          className={location.pathname === "/signup" ? "active" : ""}
          onClick={() => navigate("/signup")}
        >
          Đăng ký
        </li>
        <li>VI</li>
      </ul>
    </nav>
  );
};

export default TopNavBar;
