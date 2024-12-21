import React, { useState } from "react";
import "./ConfirmationPage.css";
import Dialog1 from "../Dialog/DialogConfirm";

interface ConfirmationPageProps {
  flightDetails: {
    ticket_id: string;
    email: string;
    flight_id: string;
    departure: string;
    arrival: string;
    departure_time: string;
    arrival_time: string;
    seat_number: string;
    price: number;
  };
  onBack: () => void;
  seatNumber: string;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  flightDetails,
  onBack,
  seatNumber,
}) => {
  const [isDialogOpen1, setDialogOpen1] = useState(false);
  const splitDateTime = (dateTimeString: string) => {
    const dateTime = new Date(dateTimeString);

    // Lấy ngày (định dạng YYYY-MM-DD)
    const date = dateTime.toISOString().split("T")[0];

    // Lấy giờ (định dạng HH:MM)
    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    const time = `${hours}:${minutes}`;

    return { date, time };
  };

  const { date: departureDate, time: departureTime } = splitDateTime(
    flightDetails.departure_time
  );

  const { date: arrivalDate, time: arrivalTime } = splitDateTime(
    flightDetails.arrival_time
  );

  const handleAccept = async (e: React.FormEvent) => {
    e.preventDefault();

    setDialogOpen1(true);
  };
  return (
    <>
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
                  <strong>Mã chuyến bay:</strong> {flightDetails.flight_id}
                </li>
                <li>
                  <strong>Điểm khởi hành:</strong> {flightDetails.departure}
                </li>
                <li>
                  <strong>Điểm đến:</strong> {flightDetails.arrival}
                </li>
                <li>
                  <strong>Ngày:</strong> {departureDate}
                </li>
                <li>
                  <strong>Giờ khởi hành:</strong> {departureTime}
                </li>
                <li>
                  <strong>Ngày đến:</strong> {arrivalDate}
                </li>
                <li>
                  <strong>Giờ đến:</strong> {arrivalTime}
                </li>
              </ul>
            </div>

            <div className="detail-section">
              <h3>Thông Tin Hành Khách</h3>
              <ul>
                <li>
                  <strong>Email:</strong> {flightDetails.email}
                </li>
                <li>
                  <strong>Mã đặt vé:</strong> {flightDetails.ticket_id}
                </li>
                <li>
                  <strong>Ghế ngồi:</strong> {seatNumber}
                </li>
              </ul>
            </div>
          </div>

          <div className="confirmation-actions">
            <button className="edit-btn" onClick={onBack}>
              Quay Lại
            </button>
            <button className="confirm-btn" onClick={handleAccept}>
              Xác Nhận
            </button>
          </div>
        </div>
      </div>
      {isDialogOpen1 && (
        <Dialog1
          title="Làm thủ tục thành công"
          description="Thủ tục của bạn đã hoàn thành. Vui lòng kiểm tra email để xem chi tiết."
          onClose={() => setDialogOpen1(false)}
        ></Dialog1>
      )}
    </>
  );
};

export default ConfirmationPage;
// Remove the incorrect custom useState function
