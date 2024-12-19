import React from "react";
import "./FlightDetails.css";

interface FlightDetailsProps {
  onContinue: () => void;
}

const FlightDetails: React.FC<FlightDetailsProps> = ({ onContinue }) => {
  return (
    <div className="flight-details-container">
      <div className="progress-steps">
        <div className="step active">1 Chi tiết chuyến bay</div>
        <div className="step">2 Hành khách</div>
        <div className="step">3 Chọn ghế</div>
        <div className="step">4 Xác nhận</div>
      </div>

      <div className="details-card">
        <h2 className="card-title">Chi tiết chuyến bay</h2>
        <div className="time-info">
          <span className="time">15:00</span>
          <span className="location">SGN</span>
          <span className="arrow">→</span>
          <span className="time">17:15</span>
          <span className="location">HAN</span>
        </div>
        <div className="flight-info">
          <div className="date">Ngày khởi hành: 30 Th05, 2023</div>
          <div className="passenger">Hành khách: 1 Người lớn</div>
          <div className="duration">Thời gian bay: 2h 15m</div>
          <div className="payment">Phương thức thanh toán: Thẻ tín dụng</div>
        </div>

        <div className="prohibited-items">
          <h3>Các vật phẩm bị cấm</h3>
          <div className="icons">
            <div className="icon">⚠️ Vật dễ cháy</div>
            <div className="icon">⚠️ Chất lỏng</div>
            <div className="icon">⚠️ Vật sắc nhọn</div>
            <div className="icon">⚠️ Hóa chất</div>
            <div className="icon">⚠️ Chất nổ</div>
            <div className="icon">⚠️ Vật liệu phóng xạ</div>
          </div>
        </div>

        <div className="actions">
          <button className="cancel-btn">Hủy</button>
          <button className="continue-btn" onClick={onContinue}>
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
