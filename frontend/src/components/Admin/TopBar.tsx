import React, {useState, useEffect} from "react";
import combinedShape from "../../assets/images/Admin/icon.svg";
import dropDown from "../../assets/images/Admin/drop-down.svg";
import flag from "../../assets/images/Admin/flag.png";
import image from "../../assets/images/Admin/oval2.svg";
import man438081960720 from "../../assets/images/Admin/man-438081-960-720.png";
import more from "../../assets/images/Admin/more.svg";
import oval from "../../assets/images/Admin/oval1.svg";
import "../../css/Admin/TopBar.css";

const TopBar: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

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
    const handleProfileClick = () => {
        console.log("Clicked on Profile");
        setIsDropdownOpen(false); // Đóng dropdown
    };

    const handleAccountClick = () => {
        console.log("Clicked on Account");
        setIsDropdownOpen(false); // Đóng dropdown
    };

    return (
        <div className="box">
            <div className="top-bar">
                <div className="overlap">
                    <div className="separator"></div>
                    <div className="profile" onClick={toggleDropdown}>
                        <img className="more" alt="More" src={more} />
                        <div className="username">Admin</div>
                        <div className="text-wrapper">Admin</div>
                        <div className="avatar-background"></div>
                        <img className="man" alt="Man" src={man438081960720} />
                        {menuVisible  && (
                            <div
                                className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}
                                onClick={(e) => e.stopPropagation()} // Ngăn click trong dropdown bị đóng
                            >
                                <ul>
                                <li onClick={handleProfileClick}>Thông tin cá nhân</li>
                                <li onClick={handleAccountClick}>Thông tin tài khoản</li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="english">
                        <div className="div">VI</div>
                        <img className="drop-down" alt="Drop down" src={dropDown} />
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