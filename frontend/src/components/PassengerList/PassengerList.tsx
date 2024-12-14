import React from "react";
import "./PassengerList.css";

interface PassengerListProps {
  onBack: () => void;
  onContinue: () => void;
}

const PassengerList: React.FC<PassengerListProps> = ({
  onBack,
  onContinue,
}) => {
  return (
    <div className="passenger-list-container">
      <header className="header">
        <div className="logo">✈️ Airline</div>
        <nav>
          <ul className="nav-links">
            <li>Trang chủ</li>
            <li>Chuyến bay</li>
            <li>Tin tức</li>
            <li>Liên hệ</li>
          </ul>
        </nav>
      </header>
      <div className="progress-steps">
        <div className="step completed">✔ Chi tiết chuyến bay</div>
        <div className="step active">2 Hành khách</div>
        <div className="step">3 Chọn ghế</div>
        <div className="step">4 Xác nhận</div>
      </div>

      <div className="passenger-card">
        <h2 className="title">Danh Sách Hành Khách</h2>
        <div className="passenger-item">
          <input type="checkbox" id="passenger1" />
          <label htmlFor="passenger1" className="passenger-name">
            <strong>Mrs Dao Thi Khuyen</strong>
            <span className="passenger-type">Adult</span>
          </label>
        </div>
        <div className="actions">
          <button className="back-btn" onClick={onBack}>
            Quay Lại
          </button>
          <button className="continue-btn" onClick={onContinue}>
            Tiếp Tục
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassengerList;
