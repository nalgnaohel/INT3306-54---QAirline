import React, {useState} from "react";
import { useTableContext } from './TableContext';
import "./SideBar.css";
const SideBar: React.FC = () => {
    const { setActiveTable } = useTableContext();
    const [selectedDiv, setSelectedDiv] = useState<string | null>(null);

  const menuItems = [
    { id: 'logout', label: 'Đăng xuất', table: 8 },
    { id: 'settings', label: 'Cài đặt', table: 7 },
    { id: 'blog', label: 'Đăng bài', table: 6 },
    { id: 'user', label: 'Người dùng', table: 5 },
    { id: 'airlines', label: 'Hãng bay', table: 4 },
    { id: 'airport', label: 'Sân bay', table: 3 },
    { id: 'flights', label: 'Chuyến bay', table: 2 },
    { id: 'booked', label: 'Đặt chỗ', table: 1 },
    { id: 'home', label: 'Trang chủ', table: 0 },
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
          <div key={item.id} className={item.id}>
            <div
              className={`products ${selectedDiv === item.id ? 'active' : ''}`}
              onClick={() => handleClick(item.id, item.table)}
            >
              <div className="background-products1"></div>
              <div className="background-products2"></div>
              <div className={`text-wrapper-3 ${selectedDiv === item.id ? 'active' : ''}`}>{item.label}</div>
            </div>
          </div>
        ))}
            <p className="bright-web" onClick={() =>handleClick('home', 0)}>
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