import React from "react";
import "./PassengerList.css";
import TopNavBar from "../Navbar/TopNavBar";
import Footer from "../Footer/Footer";

interface PassengerListProps {
  onBack: () => void;
  onContinue: () => void;
  email: string;
  bookingCode: string;
}

const PassengerList: React.FC<PassengerListProps> = ({
  onBack,
  onContinue,
  email,
  bookingCode,
}) => {
  return (
    <div className="passenger-list-container">
      <div className="progress-steps">
        <div className="step completed">✔ Chi tiết chuyến bay</div>
        <div className="step active">2 Hành khách</div>
        <div className="step">3 Chọn ghế</div>
        <div className="step">4 Xác nhận</div>
      </div>

      <div className="passenger-card_list">
        <h2 className="title1">Danh Sách Hành Khách</h2>
        <div className="passenger-item_list">
          <input type="checkbox" id="passenger1" />
          <label htmlFor="passenger1" className="passenger-name">
            <strong>{email}</strong>
            <span className="passenger-type1">Adult</span>
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
