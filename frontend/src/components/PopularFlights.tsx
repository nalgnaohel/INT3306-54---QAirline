import React from "react";
import "../css/PopularFlights.css";

const flights = [
  {
    location: "Hà Nội đến Đà Nẵng",
    price: "973,000 VND",
    destination: "Một chiều",
    rank: "Phổ thông",
    date: "20/11/2024",
    time: "12:00 AM",
    image: require("../image/danang.png"),
  },
  {
    location: "Hà Nội đến Sài Gòn",
    price: "860,000 VND",
    destination: "Một chiều",
    rank: "Phổ thông",
    date: "25/11/2024",
    time: "04:00 PM",
    image: require("../image/tphcm.png"),
  },
  {
    location: "Huế đến Hà Nội",
    price: "665,000 VND",
    destination: "Một chiều",
    rank: "Phổ thông",
    date: "29/11/2024",
    time: "12:00 PM",
    image: require("../image/hanoi.png"),
  },
  {
    location: "TP Hồ Chí Minh đến Huế",
    price: "700,000 VND",
    destination: "Một chiều",
    rank: "Phổ thông",
    date: "22/11/2024",
    time: "09:00 AM",
    image: require("../image/hue.png"),
  },
];

const PopularFlights: React.FC = () => {
  return (
    <div className="popular-flights">
      <h2>Các chuyến bay phổ biến</h2>
      <div className="flights-grid">
        {flights.map((flight, index) => (
          <div key={index} className="flight-card">
            <div className="flight-image-container">
              <img
                src={flight.image}
                alt={`Chuyến bay ${flight.location}`}
                className="flight-image"
              />
            </div>
            <div className="flight-details">
              <p className="location">{flight.location}</p>
              <p className="price">{flight.price}</p>
              <p className="destination">
                {flight.destination} / {flight.rank}
              </p>
              <p className="date">{flight.date}</p>
              <p className="time">{flight.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularFlights;
