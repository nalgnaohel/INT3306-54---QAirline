import React from "react";
import "./PopularFlights.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const airportCodes: { [key: string]: string } = {
  "Hà Nội": "HAN",
  "Đà Nẵng": "DAD",
  "Sài Gòn": "SGN",
  "TP Hồ Chí Minh": "SGN",
  Huế: "HUI",
};

const flights = [
  {
    location: "Hà Nội đến Đà Nẵng",
    price: "973,000 VND",
    destination: "Một chiều",
    rank: "Phổ thông",
    date: "2024-12-20",
    time: "12:00 AM",
    image: require("../../assets/images/danang.png"),
  },
  {
    location: "Hà Nội đến Sài Gòn",
    price: "860,000 VND",
    destination: "Một chiều",
    rank: "Phổ thông",
    date: "2024-12-21",
    time: "04:00 PM",
    image: require("../../assets/images/tphcm.png"),
  },
  {
    location: "Huế đến Hà Nội",
    price: "665,000 VND",
    destination: "Một chiều",
    rank: "Phổ thông",
    date: "2024-12-22",
    time: "12:00 PM",
    image: require("../../assets/images/hanoi.png"),
  },
  {
    location: "TP Hồ Chí Minh đến Huế",
    price: "700,000 VND",
    destination: "Một chiều",
    rank: "Phổ thông",
    date: "2024-12-23",
    time: "09:00 AM",
    image: require("../../assets/images/hue.png"),
  },
];

type Flight = {
  departure: string;
  arrival: string;
  price: string;
  departureDate: string;
  departureTime: string;
};

const PopularFlights: React.FC = () => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleFlightClick = (flight: (typeof flights)[0]) => {
    const [departure, destination] = flight.location.split(" đến ");
    const departureCode = airportCodes[departure.trim()];
    const destinationCode = airportCodes[destination.trim()];

    if (!departureCode || !destinationCode) {
      console.error("Không tìm thấy mã sân bay.");
      setError("Không tìm thấy mã sân bay.");
      return;
    }

    fetchFlights(departureCode, destinationCode, flight.date).then(
      (fetchedFlights) => {
        navigate("/search-results", { state: { flights: fetchedFlights } });
      }
    );
  };

  const fetchFlights = async (
    departureCode: string,
    destinationCode: string,
    departureDate: string
  ) => {
    try {
      const url = `http://127.0.0.1:5000/api/flight/onewayflight?departure=${departureCode}&arrival=${destinationCode}&departureDate=${departureDate}`;
      console.log("Fetching URL:", url);

      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      return data.flights || [];
    } catch (error) {
      console.error(error);
      setError("Đã xảy ra lỗi khi tìm kiếm chuyến bay.");
      return [];
    }
  };

  return (
    <div className="popular-flights">
      <h2>Các chuyến bay phổ biến</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="flights-grid">
        {flights.map((flight, index) => (
          <div
            key={index}
            className="flight-card"
            onClick={() => handleFlightClick(flight)}
          >
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
