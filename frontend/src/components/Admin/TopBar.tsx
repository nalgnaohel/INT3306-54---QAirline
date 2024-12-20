import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
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
    const handleClick = () => {
        console.log("Clicked on Profile");
        setIsDropdownOpen(false); // Đóng dropdown
    };

    return (
        <div className="box">
            <div className="top-bar">
                <div className="overlap">
                    <div className="separator"></div>
                    <img className="top-bar-logo" src="logo.png" onClick={() => navigate("/")}/>
                    <div className="profile" onClick={toggleDropdown}>
                        <img className="more" alt="More" src={more} />
                        <div className="username">Admin</div>
                        <div className="text-wrapper">Admin</div>
                        <div className="avatar-background"></div>
                        <img className="man" alt="Man" src={man438081960720} />
                        {menuVisible && (
                            <div
                                className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}
                                onClick={(e) => e.stopPropagation()} // Ngăn click trong dropdown bị đóng
                            >
                                <ul>
                                <li onClick={handleClick}>Trang chủ</li>
                                <li onClick={handleClick}>Đặt chỗ</li>
                                <li onClick={handleClick}>Chuyến bay</li>
                                <li onClick={handleClick}>Tàu bay</li>
                                <li onClick={handleClick}>Sân bay</li>
                                <li onClick={handleClick}>Hãng bay</li>
                                <li onClick={handleClick}>Người dùng</li>
                                <li onClick={handleClick}>Đăng bài</li>
                                <li onClick={handleClick}>Cài đặt</li>
                                <li onClick={handleClick}>Đăng xuất</li>
                                </ul>
                            </div>
                        )}
                    </div>
                    {/* <div className="overlap-group">
                        <div className="icon">
                            <div className="overlap-group-2">
                                <div className="icon-2">
                                    <img className="combined-shape" alt="Combined shape" src={combinedShape} />
                                </div>
                                <img className="oval" alt="Oval" src={oval} />
                                <div className="text-wrapper-2">6</div>
                            </div>
                        </div>
                        <img className="img" alt="Oval" src={image} />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default TopBar;