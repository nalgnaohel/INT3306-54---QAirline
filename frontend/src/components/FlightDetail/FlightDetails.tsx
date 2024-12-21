import React from "react";
import "./FlightDetails.css";
import { useLocation, useNavigate } from "react-router-dom";

interface FlightDetailsProps {
  onContinue: () => void;
}

const FlightDetails: React.FC<FlightDetailsProps> = ({ onContinue }) => {
  const location = useLocation();
  const {
    flight_id,
    departure,
    arrival,
    departure_time,
    arrival_time,
    price,
    email,
    bookingCode,
  } = location.state || {};
  console.log(location.state);
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

  const calculateDuration = (
    departure_time: string,
    arrival_time: string
  ): string => {
    const departure = new Date(departure_time);
    const arrival = new Date(arrival_time);
    const diffMs = arrival.getTime() - departure.getTime(); // Difference in milliseconds

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  const { date: departureDate, time: departureTime } =
    splitDateTime(departure_time);

  const { date: arrivalDate, time: arrivalTime } = splitDateTime(arrival_time);

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
          <span className="time">{departureTime}</span>
          <span className="location">{departure}</span>
          <span className="arrow">→</span>
          <span className="time">{arrivalTime}</span>
          <span className="location">{arrival}</span>
        </div>
        <div className="flight-info2">
          <div className="date1">Ngày khởi hành: {departureDate}</div>
          <div className="passenger">Hành khách: 1 Người lớn</div>
          <div className="duration">
            Thời gian bay: {calculateDuration(departure_time, arrival_time)}
          </div>
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
