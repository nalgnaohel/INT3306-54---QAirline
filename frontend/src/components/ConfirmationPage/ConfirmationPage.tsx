import React from "react";
import "./ConfirmationPage.css";

interface ConfirmationPageProps {
  flightDetails: {
    flightNumber: string;
    departure: string;
    destination: string;
    date: string;
    time: string;
  };
  passenger: {
    name: string;
    type: string;
  };
  selectedSeat: string;
  onConfirm: () => void;
  onBack: () => void;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  flightDetails,
  passenger,
  selectedSeat,
  onConfirm,
  onBack,
}) => {
  return (
    <div className="confirmation-container">
      <div className="progress-steps">
        <div className="step completed">✔ Chi tiết chuyến bay</div>
        <div className="step completed">✔ Hành khách</div>
        <div className="step completed">✔ Chọn ghế</div>
        <div className="step active">4 Xác nhận</div>
      </div>
      <div className="confirmation-card">
        <h2>Xác Nhận Thông Tin</h2>
        <div className="confirmation-details">
          <div className="detail-section">
            <h3>Chi Tiết Chuyến Bay</h3>
            <ul>
              <li>
                <strong>Mã chuyến bay:</strong> {flightDetails.flightNumber}
              </li>
              <li>
                <strong>Điểm khởi hành:</strong> {flightDetails.departure}
              </li>
              <li>
                <strong>Điểm đến:</strong> {flightDetails.destination}
              </li>
              <li>
                <strong>Ngày:</strong> {flightDetails.date}
              </li>
              <li>
                <strong>Giờ khởi hành:</strong> {flightDetails.time}
              </li>
            </ul>
          </div>

          <div className="detail-section">
            <h3>Thông Tin Hành Khách</h3>
            <ul>
              <li>
                <strong>Tên:</strong> {passenger.name}
              </li>
              <li>
                <strong>Loại hành khách:</strong> {passenger.type}
              </li>
              <li>
                <strong>Ghế ngồi:</strong> {selectedSeat}
              </li>
            </ul>
          </div>
        </div>

        <div className="confirmation-actions">
          <button className="edit-btn" onClick={onBack}>
            Quay Lại
          </button>
          <button className="confirm-btn" onClick={onConfirm}>
            Xác Nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
