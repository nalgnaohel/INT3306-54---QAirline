import React from "react";
import "../css/Navbar.css";
const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-ul">
        <li>Trang chủ</li>
        <li>Trợ giúp</li>
        <li>Đăng nhập</li>
        <li>Đăng ký</li>
        <li>VI</li>
      </ul>
    </nav>
  );
};

export default Navbar;
