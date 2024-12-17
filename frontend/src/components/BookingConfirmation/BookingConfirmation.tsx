import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingConfirmation.css";
import TopNavBar from "../Navbar/TopNavBar";
import Footer from "../Footer/Footer";

interface BookingConfirmationProps {}

const BookingConfirmation: React.FC<BookingConfirmationProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, fareType } = location.state || {};
  const handleConfirmBooking = () => {
    // Giả sử bạn có một state chứa thông tin số lượng hành khách
    const bookingState = {
      adults: 2,
      children: 1,
      infants: 1,
    };

    const numberOfPassengers =
      bookingState.adults + bookingState.children + bookingState.infants;

    navigate("/passenger-info", {
      state: {
        adults: bookingState.adults,
        children: bookingState.children,
        infants: bookingState.infants,
      },
    });
  };

  if (!flight) {
    return (
      <div className="booking-confirmation">
        <h2>Thông tin đặt vé không khả dụng</h2>
        <button onClick={() => navigate("/")}>Quay về trang chủ</button>
      </div>
    );
  }

  // Calculate the total price based on fare type
  const basePrice = flight.price;
  const fareMultiplier = fareType.includes("business") ? 3 : 1;
  const totalPrice = basePrice * fareMultiplier;

  return (
    <>
      <TopNavBar />
      <div className="booking-confirmation">
        <h2>Lựa chọn của Quý khách</h2>
        <h3>
          {flight.departure} đến {flight.destination}
        </h3>

        <div className="alert-box">
          <span>⚠️</span>
          <p>Hãy nhanh tay! Chỉ còn vài ghế cuối cùng với mức giá này.</p>
        </div>

        <div className="flight-details1">
          <div className="flight-time1">
            <p>
              <strong>Khởi hành:</strong>{" "}
              {new Date(flight.departureTime).toLocaleString()}
            </p>
            <p>
              <strong>Đến nơi:</strong>{" "}
              {new Date(flight.arrivalTime).toLocaleString()}
            </p>
          </div>
          <div className="flight-info1">
            <p>
              <strong>Mã chuyến bay:</strong> {flight.flightNumber}
            </p>
            <p>
              <strong>Hãng bay:</strong> {flight.airline}
            </p>
            <p>
              <strong>Thời gian bay:</strong> {flight.duration}
            </p>
          </div>
        </div>

        <div className="total-price">
          <p>
            <strong>Tổng số tiền:</strong> {totalPrice.toLocaleString("vi-VN")}{" "}
            VND
          </p>
        </div>

        <button className="confirm-button" onClick={handleConfirmBooking}>
          Tiếp tục
        </button>
      </div>
      <Footer />
    </>
  );
};

export default BookingConfirmation;
