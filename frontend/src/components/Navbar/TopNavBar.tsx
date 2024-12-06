import React from "react";
import './navbar.css';

//Navbar at the top of the app
const TopNavBar: React.FC = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-ul">
                <li>Trang chủ</li>
                <li>Tro giup</li>
                <li>Dang nhap</li>
                <li>Dang ky</li>
                <li>VI</li>
            </ul>
        </nav>
    );
};

export default TopNavBar;
