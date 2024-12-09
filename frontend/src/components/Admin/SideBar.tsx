import React, {useState} from "react";
import { useTableContext } from './TableContext';
import "../../css/Admin/SideBar.css";
const SideBar: React.FC = () => {
    const { setActiveTable } = useTableContext();
    const [selectedDiv, setSelectedDiv] = useState<string | null>(null);

  const menuItems = [
    { id: 'logout', label: 'Đăng xuất', table: null },
    { id: 'settings', label: 'Cài đặt', table: null },
    { id: 'user', label: 'Người dùng', table: 5 },
    { id: 'airlines', label: 'Hãng bay', table: 4 },
    { id: 'airport', label: 'Sân bay', table: 3 },
    { id: 'flights', label: 'Chuyến bay', table: 2 },
    { id: 'booked', label: 'Đặt chỗ', table: 1 },
    { id: 'home', label: 'Trang chủ', table: null },
  ];

  const handleClick = (id: string, table: number | null) => {
    setSelectedDiv(id);
    if (table !== null) {
      setActiveTable(table);
    }
  };

return (
<div className="box-2">
    <div className="side-bar">
        <div className="overlap">
        {menuItems.map((item) => (
        <div className={item.id}>
            <div
            key={item.id}
            className={`products ${selectedDiv === item.id ? 'active' : ''}`}
            onClick={() => handleClick(item.id, item.table)}
            >
                <div className="text-wrapper-3">{item.label}</div>
            </div>
        </div>
      ))}
            <p className="bright-web">
                <span className="span">QARILINE </span>
                <span className="text-wrapper-4">HỆ THỐNG ĐẶT CHỖ TRỰC TUYẾN</span>
            </p>
            <div className="divider"></div>
            <div className="separator"></div>
        </div>
    </div>
</div>
);
};

export default SideBar;