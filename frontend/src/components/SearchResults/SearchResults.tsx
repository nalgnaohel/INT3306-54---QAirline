import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaDollarSign,
  FaChair,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa"; // Import React Icons
import "./SearchResults.css";
import TopNavBar from "../Navbar/TopNavBar";
import Footer from "../Footer/Footer";

interface Flight {
  flight_id: string;
  brand: string;
  departure_code: string;
  arrival_code: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  available_seats: number;
}

const SearchResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const flights = (location.state?.flights as Flight[]) || []; // Đảm bảo giá trị mặc định là một mảng rỗng

  // Hàm phân tách ngày và giờ từ chuỗi datetime
  const splitDateTime = (dateTimeString: string) => {
    const dateTime = new Date(dateTimeString);
    const date = dateTime.toISOString().split("T")[0];
    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    const time = `${hours}:${minutes}`;
    return { date, time };
  };

  const flightDateTimes = flights.map((flight) => ({
    departure: splitDateTime(flight.departure_time),
    arrival: splitDateTime(flight.arrival_time),
  }));

  return (
    <>
      <TopNavBar />
      <div className="search-results">
        <h3>Kết quả tìm kiếm</h3>
        {flights.length > 0 ? (
          flights.map((flight, index) => (
            <div key={index} className="result-card">
              {/* Kiểm tra nếu flight có dữ liệu trước khi hiển thị */}
              {flight.departure_code && flight.arrival_code ? (
                <>
                  <div className="flight-info">
                    <p className="departure">
                      <FaPlaneDeparture />
                      <strong>Điểm đi:</strong> {flight.departure_code}
                    </p>
                    <p className="arrival">
                      <FaPlaneArrival />
                      <strong>Điểm đến:</strong> {flight.arrival_code}
                    </p>
                    <p className="price">
                      <FaDollarSign />
                      <strong>Giá vé:</strong> {flight.price} VND
                    </p>
                  </div>
                  <div className="flight-details">
                    <p>
                      <FaCalendarAlt />
                      <strong>Ngày bay:</strong>{" "}
                      {flightDateTimes[index].departure.date}
                    </p>
                    <p>
                      <FaClock />
                      <strong>Giờ bay:</strong>{" "}
                      {flightDateTimes[index].departure.time}
                    </p>
                    <p>
                      <FaCalendarAlt />
                      <strong>Ngày đến:</strong>{" "}
                      {flightDateTimes[index].arrival.date}
                    </p>
                    <p>
                      <FaClock />
                      <strong>Giờ đến:</strong>{" "}
                      {flightDateTimes[index].arrival.time}
                    </p>
                    <p className="available-seats">
                      <FaChair />
                      <strong>Số ghế trống:</strong> {flight.available_seats}
                    </p>
                  </div>
                </>
              ) : (
                <p>Thông tin chuyến bay không đầy đủ.</p>
              )}
            </div>
          ))
        ) : (
          <p className="no-results">Không tìm thấy chuyến bay nào.</p>
        )}
        {/* Nút quay lại trang chủ */}

        <div className="home-button-container">
          <button
            className="home-button"
            onClick={() => {
              navigate("/");
            }}
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;
