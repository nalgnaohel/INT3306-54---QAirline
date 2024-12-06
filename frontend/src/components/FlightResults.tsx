import React from "react";
import "../css/FlightResults.css";

export interface Flight {
  id: number;
  flightNumber: string;
  departure: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
  airline: string;
  duration: string;
  class: string;
}

interface FlightResultsProps {
  flights: Flight[];
}

const FlightResults: React.FC<FlightResultsProps> = ({ flights }) => {
  if (flights.length === 0) {
    return (
      <div className="flight-results">
        <h2>Kết quả tìm kiếm chuyến bay</h2>
        <p>Không tìm thấy chuyến bay nào phù hợp với tìm kiếm của bạn.</p>
      </div>
    );
  }

  return (
    <div className="flight-results">
      <h2>Kết quả tìm kiếm chuyến bay</h2>
      {flights.map((flight) => (
        <div key={flight.id} className="flight-item">
          <div>
            <strong>{flight.flightNumber}</strong>
            <p>
              {flight.departure} → {flight.destination}
            </p>
            <p>
              Giờ bay: {new Date(flight.departureTime).toLocaleString()} <br />
              Giờ đến: {new Date(flight.arrivalTime).toLocaleString()}
            </p>
            <p>Thời gian bay: {flight.duration}</p>
            <p>Hãng bay: {flight.airline}</p>
            <p>Hạng vé: {flight.class}</p>
            <p>Giá vé: {flight.price.toLocaleString("vi-VN")} VND</p>
            <p>Số ghế còn: {flight.availableSeats}</p>
          </div>
          <button className="book-now-button" aria-label="Đặt vé">
            Đặt vé
          </button>
        </div>
      ))}
    </div>
  );
};

export default FlightResults;
