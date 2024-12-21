import React, {useState, useEffect} from "react";
import { useTableContext } from './TableContext';
import "./SideBar.css";
const SideBar: React.FC = () => {
    const { setActiveTable } = useTableContext();
    const { activeTable } = useTableContext();
    const [selectedDiv, setSelectedDiv] = useState<string | null>(null);

  const menuItems = [
    { id: 'home', label: 'Trang chủ', table: 0 },
    { id: 'booked', label: 'Đặt chỗ', table: 1 },
    { id: 'flights', label: 'Chuyến bay', table: 2 },
    { id: 'planes', label: 'Tàu bay', table: 3 },
    { id: 'airport', label: 'Sân bay', table: 4 },
    { id: 'airlines', label: 'Hãng bay', table: 5 },
    { id: 'user', label: 'Người dùng', table: 6 },
    { id: 'blog', label: 'Đăng bài', table: 7 },
    { id: 'settings', label: 'Cài đặt', table: 8 },
    { id: 'logout', label: 'Đăng xuất', table: 9 },
  ];

  const handleClick = (id: string, table: number | null) => {
    if (table !== null) {
      setActiveTable(table);
    }
  };

  function findIdByTable(tabValue: number | null) {
    const item = menuItems.find(item => item.table === tabValue);
    return item ? item.id : null;
  }

  useEffect(() => {
      setSelectedDiv(findIdByTable(activeTable));
  }, [activeTable]); // Chỉ chạy khi activeContent thay đổi

return (
  <div className="side-bar-container">
    {menuItems.map((item) => (
      <div key={item.id} className={`side-bar ${item.id}`}>
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
    <div className="divider"></div>
    <div className="separator"></div>
  </div>
);
};

export default SideBar;