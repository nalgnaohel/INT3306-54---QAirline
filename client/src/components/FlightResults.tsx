import React, { useState } from "react";
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
  const [expandedFlightId, setExpandedFlightId] = useState<number | null>(null);
  const [selectedFare, setSelectedFare] = useState<string | null>(null);

  const toggleDetails = (id: number) => {
    setExpandedFlightId(expandedFlightId === id ? null : id);
  };

  const handleFareSelect = (fare: string) => {
    setSelectedFare(fare);
  };

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
          <div className="flight-info">
            <div className="time-details">
              <p>{new Date(flight.departureTime).toLocaleDateString()}</p>
              <strong>
                {new Date(flight.departureTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </strong>
              <p>{flight.departure}</p>
            </div>
            <div className="duration">
              <p>{flight.duration}</p>
              <p id="muiten">→</p>
            </div>
            <div className="time-details">
              <p>{new Date(flight.arrivalTime).toLocaleDateString()}</p>
              <strong>
                {new Date(flight.arrivalTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </strong>
              <p>{flight.destination}</p>
            </div>
          </div>
          <div className="fare-options">
            <div
              className={`fare-option economy ${
                selectedFare === "economy" ? "selected" : ""
              }`}
              onClick={() => {
                handleFareSelect("economy");
                toggleDetails(flight.id);
              }}
            >
              <p>Phổ thông</p>
              <span>{flight.price.toLocaleString("vi-VN")} VND</span>
              <div className="dropdown">▼</div>
            </div>
            <div
              className={`fare-option business ${
                selectedFare === "business" ? "selected" : ""
              }`}
              onClick={() => {
                handleFareSelect("business");
                toggleDetails(flight.id);
              }}
            >
              <p>Thương gia</p>
              <span>{(flight.price * 3).toLocaleString("vi-VN")} VND</span>
              <div className="dropdown">▼</div>
            </div>
          </div>
          {expandedFlightId === flight.id && (
            <div className="fare-selection">
              <div className="fare-box3"></div>
              <div className="fare-box1">
                <div
                  className={`fare-box ${
                    selectedFare === "economySaver" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedFare("economySaver")}
                >
                  <h3>Phổ thông tiết kiệm</h3>
                  <div className="fare-details">
                    <p>
                      <strong>Hãng bay:</strong> {flight.airline}
                    </p>
                    <p>
                      <strong>Số ghế còn trống:</strong> {flight.availableSeats}
                    </p>
                    <p>
                      <strong>Mã chuyến bay:</strong> {flight.flightNumber}
                    </p>
                  </div>
                </div>
              </div>
              <div className="fare-box2">
                <div
                  className={`fare-box ${
                    selectedFare === "economyStandard" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedFare("economyStandard")}
                >
                  <h3>Phổ thông tiêu chuẩn</h3>
                  <div className="fare-details">
                    <p>
                      <strong>Hãng bay:</strong> {flight.airline}
                    </p>
                    <p>
                      <strong>Số ghế còn trống:</strong> {flight.availableSeats}
                    </p>
                    <p>
                      <strong>Mã chuyến bay:</strong> {flight.flightNumber}
                    </p>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <button>Xác nhận và đặt vé</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FlightResults;
