import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useTableContext } from "./TableContext";
import combinedShape from "../../assets/images/Admin/icon.svg";
import dropDown from "../../assets/images/Admin/drop-down.svg";
import flag from "../../assets/images/Admin/flag.png";
import image from "../../assets/images/Admin/oval2.svg";
import man438081960720 from "../../assets/images/Admin/man-438081-960-720.png";
import more from "../../assets/images/Admin/more.svg";
import oval from "../../assets/images/Admin/oval1.svg";
import "./TopBar.css";

const TopBar: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const { setActiveTable } = useTableContext();
    const navigate = useNavigate();

    const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn sự kiện lan tới document
    if (!isDropdownOpen) {
        setMenuVisible(true); // Hiển thị menu trước
        setTimeout(() => setIsDropdownOpen(true), 0); // Thêm class "open" sau khi render
      } else {
        setIsDropdownOpen(false);
        setTimeout(() => setMenuVisible(false), 300); // Ẩn menu sau hiệu ứng
      }
    };
      
    const handleClickOutside = (e: MouseEvent) => {
        const dropdownElement = document.querySelector(".dropdown-menu");
        const profileElement = document.querySelector(".profile");
    
        if (
        dropdownElement &&
        !dropdownElement.contains(e.target as Node) &&
        profileElement &&
        !profileElement.contains(e.target as Node)
        ) {
        setIsDropdownOpen(false); // Chỉ đóng khi click bên ngoài cả dropdown và profile
        }
    };
    
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
        document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // Hàm xử lý sự kiện click cho các mục
    const handleClick = (table: number | null) => {
        if (table !== null) {
            setActiveTable(table)
        }
        setIsDropdownOpen(false); // Đóng dropdown
    };

    return (
        <div className="admin-top-bar-container">
            <div className="admin-top-bar">
                <img className="admin-top-bar-logo" src="logo.png" onClick={() => navigate("/")}/>
                <div className="profile" onClick={toggleDropdown}>
                    <img className="man" alt="Man" src={man438081960720} />
                    {menuVisible && (
                        <div
                            className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}
                            onClick={(e) => e.stopPropagation()} // Ngăn click trong dropdown bị đóng
                        >
                            <ul>
                            <li onClick={() => handleClick(0)}>Trang chủ</li>
                            <li onClick={() => handleClick(1)}>Đặt chỗ</li>
                            <li onClick={() => handleClick(2)}>Chuyến bay</li>
                            <li onClick={() => handleClick(3)}>Tàu bay</li>
                            <li onClick={() => handleClick(4)}>Sân bay</li>
                            <li onClick={() => handleClick(5)}>Hãng bay</li>
                            <li onClick={() => handleClick(6)}>Người dùng</li>
                            <li onClick={() => handleClick(7)}>Đăng bài</li>
                            <li onClick={() => handleClick(8)}>Cài đặt</li>
                            <li onClick={() => handleClick(9)}>Đăng xuất</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopBar;