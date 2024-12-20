import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingConfirmation.css";
import TopNavBar from "../Navbar/TopNavBar";
import Footer from "../Footer/Footer";

interface BookingConfirmationProps {}

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

const BookingConfirmation: React.FC<BookingConfirmationProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, returnFlight, fareType, passengerCounts, tripType } =
    location.state || {};
  console.log(location.state);
  const handleConfirmBooking = () => {
    // Giả sử bạn có một state chứa thông tin số lượng hành khách
    const bookingState = passengerCounts;

    navigate("/passenger-info", {
      state: {
        adults: bookingState.adult,
        children: bookingState.child,
        infants: bookingState.infant,
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

  var totalPrice = flight.price;

  if (fareType === "economySaver") {
    totalPrice = flight.price;
  }
  if (fareType === "economyStandard") {
    totalPrice = flight.price + 500;
  }
  if (fareType === "businessSaver") {
    totalPrice = flight.price * 2;
  }
  if (fareType === "businessStandard") {
    totalPrice = flight.price * 2 + 700;
  }

  if (tripType === "round-trip") {
    totalPrice = totalPrice * 2;
  }

  return (
    <>
      <TopNavBar />
      <div className="booking-confirmation">
        <h2>Lựa chọn của Quý khách</h2>

        <div className="alert-box">
          <span>⚠️</span>
          <p>Hãy nhanh tay! Chỉ còn vài ghế cuối cùng với mức giá này.</p>
        </div>

        <h3>
          {flight.departure} đến {flight.arrival}
        </h3>

        <div className="flight-details1">
          <div className="flight-time1">
            <p>
              <strong>Khởi hành:</strong>{" "}
              {new Date(flight.departure_time).toLocaleString()}
            </p>
            <p>
              <strong>Đến nơi:</strong>{" "}
              {new Date(flight.arrival_time).toLocaleString()}
            </p>
          </div>
          <div className="flight-info1">
            <p>
              <strong>Mã chuyến bay:</strong> {flight.flight_id}
            </p>
            <p>
              <strong>Hãng bay:</strong> {flight.brand}
            </p>
            <p>
              <strong>Thời gian bay:</strong>{" "}
              {calculateDuration(flight.departure_time, flight.arrival_time)}
            </p>
          </div>
        </div>
        {tripType === "round-trip" && (
          <>
            <h3>
              {returnFlight.departure} đến {returnFlight.arrival}
            </h3>
            <div className="flight-details1">
              <div className="flight-time1">
                <p>
                  <strong>Khởi hành:</strong>{" "}
                  {new Date(returnFlight.departure_time).toLocaleString()}
                </p>
                <p>
                  <strong>Đến nơi:</strong>{" "}
                  {new Date(returnFlight.arrival_time).toLocaleString()}
                </p>
              </div>
              <div className="flight-info1">
                <p>
                  <strong>Mã chuyến bay:</strong> {returnFlight.flight_id}
                </p>
                <p>
                  <strong>Hãng bay:</strong> {returnFlight.brand}
                </p>
                <p>
                  <strong>Thời gian bay:</strong>{" "}
                  {calculateDuration(
                    returnFlight.departure_time,
                    returnFlight.arrival_time
                  )}
                </p>
              </div>
            </div>
          </>
        )}

        <div className="total-price">
          <p>
            <strong>Tổng số tiền:</strong> {totalPrice.toLocaleString("vi-VN")}
            .000 VND
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
