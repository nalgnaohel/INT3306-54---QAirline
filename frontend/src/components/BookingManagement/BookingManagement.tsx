import React, { useEffect, useState } from "react";
import "./BookingManagement.css"; // Import a CSS file for styling
import TopNavBar from "../Navbar/TopNavBar";
import Footer from "../Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";

const BookingManagement = () => {
  const [bookingCode1, setBookingCode] = useState("");
  const [email1, setEmail] = useState("");
  const [flightDetails, setFlightDetails] = useState<FlightDetails | null>(
    null
  );
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const {
    flight_id,
    departure,
    arrival,
    departure_time,
    arrival_time,
    seat_number,
    price,
    email,
    bookingCode,
  } = location.state || {};

  interface FlightDetails {
    flight_id: string;
    bookingCode: string;
    email: string;
    departure: string;
    arrival: string;
    departure_time: string;
    arrival_time: string;
    seat_number: string;
    price: string;
  }

  // Hàm fetch dữ liệu từ API
  const fetchFlightDetails = async (code: string, userEmail: string) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/ticket/tickets/${code}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.email === userEmail) {
        setFlightDetails(data);
        setError(""); // Xóa thông báo lỗi nếu tìm thấy
      } else {
        setFlightDetails(null);
        setError("Email không khớp với mã đặt chỗ.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Đã xảy ra lỗi khi tìm kiếm đặt chỗ.");
      }
    }
  };

  // Hàm xử lý khi submit form
  const handleSearch = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!bookingCode1 || !email1) {
      setError("Vui lòng nhập đầy đủ mã đặt chỗ và email.");
      return;
    }
    await fetchFlightDetails(bookingCode1, email1);
  };

  // Khởi tạo dữ liệu ban đầu và tự động tìm kiếm
  useEffect(() => {
    if (email && bookingCode) {
      setEmail(email);
      setBookingCode(bookingCode);
      fetchFlightDetails(bookingCode, email); // Tự động tìm kiếm khi có dữ liệu
    }
  }, [email, bookingCode]);

  // Hàm phân tách ngày và giờ từ chuỗi datetime
  const splitDateTime = (dateTimeString: string) => {
    const dateTime = new Date(dateTimeString);
    const date = dateTime.toISOString().split("T")[0];
    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    const time = `${hours}:${minutes}`;
    return { date, time };
  };
  interface DateTime {
    date: string;
    time: string;
  }

  const { date: departureDate = "", time: departureTime = "" } = flightDetails
    ? splitDateTime(flightDetails.departure_time)
    : { date: "", time: "" };

  const { date: arrivalDate = "", time: arrivalTime = "" } = flightDetails
    ? splitDateTime(flightDetails.arrival_time)
    : { date: "", time: "" };

  return (
    <>
      <TopNavBar />
      <div className="booking-management-page">
        <h2>Quản lý Đặt Chỗ</h2>
        <form onSubmit={handleSearch}>
          <div className="form-group-2">
            <label>Mã đặt chỗ / Số vé điện tử</label>
            <input
              type="text"
              placeholder="Mã đặt chỗ / Số vé điện tử"
              value={bookingCode1}
              onChange={(e) => setBookingCode(e.target.value)}
            />
          </div>
          <div className="form-group-2">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email1}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-submitseat">
            Tìm kiếm
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        {flightDetails && (
          <div className="flight-info-man">
            <h3>Thông Tin Chuyến Bay</h3>
            <p>
              <strong>Mã đặt chỗ:</strong> {flightDetails.bookingCode}
            </p>
            <p>
              <strong>Email:</strong> {flightDetails.email}
            </p>
            <p>
              <strong>Số hiệu chuyến bay:</strong> {flightDetails.flight_id}
            </p>
            <p>
              <strong>Nơi đi:</strong> {flightDetails.departure}
            </p>
            <p>
              <strong>Nơi đến:</strong> {flightDetails.arrival}
            </p>
            <p>
              <strong>Ngày bay:</strong> {departureDate}
            </p>
            <p>
              <strong>Giờ bay:</strong> {departureTime}
            </p>
            <p>
              <strong>Ngày đến:</strong> {arrivalDate}
            </p>
            <p>
              <strong>Giờ đến:</strong> {arrivalTime}
            </p>
            <p>
              <strong>Ghế:</strong> {flightDetails.seat_number}
            </p>
            <p>
              <strong>Giá vé:</strong> {flightDetails.price}
            </p>
          </div>
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

export default BookingManagement;
