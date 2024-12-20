import React, {useState, useEffect} from "react";
import { useUserContext } from "../UserContent/UserContext";
import avatar from '../../assets/images/avatar.png'
import "./UserControlPanel.css";

const SideBar: React.FC = () => {
    const [selectedDiv, setSelectedDiv] = useState<string | null>(null);
    const { setActiveContent } = useUserContext();
    const { activeContent } = useUserContext();

  const menuItems = [
    { id: 'account', label: 'Tài khoản của tôi', tab: 0 },
    { id: 'profile-control-panel', label: 'Thông tin cá nhân', tab: 1 },
    { id: 'flight', label: 'Quản lý chuyến bay', tab: 2 },
    { id: 'logout', label: 'Đăng xuất', tab: 3 },
  ];

  const handleClick = (tab: number | null) => {
    if (tab !== null) {
      setActiveContent(tab)
    }
  };

  function findIdByTab(tabValue: number | null) {
    const item = menuItems.find(item => item.tab === tabValue);
    return item ? item.id : null;
  }

  useEffect(() => {
    setSelectedDiv(findIdByTab(activeContent));
}, [activeContent]); // Chỉ chạy khi activeContent thay đổi

return (
    <div className="user-control-container">
        {menuItems.map((item) => (
            <div key={item.id} className={`control-button ${item.id}`}>
                <div
                className={`products ${selectedDiv === item.id ? 'active' : ''}`}
                onClick={() => handleClick(item.tab)}
                >
                <div className="background-products1"></div>
                <div className="background-products2"></div>
                <div className={`text-wrapper-3 ${selectedDiv === item.id ? 'active' : ''}`}>{item.label}</div>
                </div>
            </div>
            
        ))}
        <div className="divider"></div>
    </div>
);
};

export default SideBar;