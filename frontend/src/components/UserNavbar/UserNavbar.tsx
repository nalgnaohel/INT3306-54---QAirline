import React, {useState, useEffect} from "react";
import { UserProvider, useUserContext } from "../UserContent/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import avatar from "../../assets/images/Admin/man-438081-960-720.png";
import more from "../../assets/images/Admin/more.svg";
import "./UserNavbar.css";

const TopBar: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const { setActiveContent } = useUserContext();
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
    const handleClick = (tab: number | null) => {
        if (tab !== null) {
            setActiveContent(tab)
        }
        setIsDropdownOpen(false); // Đóng dropdown
    };

    return (
        <div className="user-navbar">
            <div className="top-bar-container">
                <img className="logo-user-navbar" src="logo.png" onClick={() => navigate("/")}/>
                <div className="top-bar-button">
                    <div className="button" onClick={() => navigate("/")}>Trang chủ</div>
                    <div className="button">Trợ giúp</div>
                    <div className="profile" onClick={toggleDropdown}>
                        <div>
                            <div className="avatar">
                                <img className="man" alt="Man" src={avatar} />
                            </div>
                        </div>
                        {menuVisible && (
                            <div
                                className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}
                                onClick={(e) => e.stopPropagation()} // Ngăn click trong dropdown bị đóng
                            >
                                <ul>
                                <li onClick={() => handleClick(0)}>Tài khoản của tôi</li>
                                <li onClick={() => handleClick(1)}>Thông tin cá nhân</li>
                                <li onClick={() => handleClick(2)}>Quản lý chuyến bay</li>
                                <li onClick={() => handleClick(3)}>Đăng xuất</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;