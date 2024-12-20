import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FlightResults.css";
import TopNavBar from "../Navbar/TopNavBar";

export interface Flight {
  flight_id: string;
  brand: string;
  departure: string;
  arrival: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  available_seats: number;
}

interface FlightResultsProps {
  flights: Flight[];
  returnFlights: Flight[];
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  passengerCounts: { adult: number; child: number; infant: number };
  tripType: string;
}

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

const FlightResults: React.FC<FlightResultsProps> = ({
  flights,
  returnFlights,
  setIsSearching,
  passengerCounts,
  tripType,
}) => {
  const [expandedFlightId, setExpandedFlightId] = useState<string | null>(null);
  const [selectedFare, setSelectedFare] = useState<
    | "economySaver"
    | "economyStandard"
    | "businessSaver"
    | "businessStandard"
    | null
  >(null);

  console.log(tripType);

  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 10;
  const totalPages = Math.ceil(flights.length / flightsPerPage);

  // Hiện thị thông tin các vé
  const toggleDetails = (id: string) => {
    setExpandedFlightId(expandedFlightId === id ? null : id);
  };

  // Chuyển hướng đến trang thanh toán
  const navigate = useNavigate();

  // Tính toán các chuyến bay hiển thị trên trang hiện tại
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = flights.slice(indexOfFirstFlight, indexOfLastFlight);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedFlightId(null);
    setSelectedFare(null);
  };

  const calculateTotalPrice = (basePrice: number) => {
    const { adult, child, infant } = passengerCounts;
    return (adult + child + infant) * basePrice;
  };

  const handleConfirmBooking = () => {
    if (selectedFare && expandedFlightId !== null) {
      const selectedFlight = flights.find(
        (flight) => flight.flight_id === expandedFlightId
      );
      if (selectedFlight) {
        console.log(tripType);
        if (tripType === "one-way") {
          navigate("/confirmation", {
            state: {
              flight: selectedFlight,
              fareType: selectedFare,
              passengerCounts: passengerCounts,
              tripType: tripType,
            },
          });
        } else {
          navigate("/returnflight", {
            state: {
              flight: selectedFlight,
              returnFlights: returnFlights,
              fareType: selectedFare,
              passengerCounts: passengerCounts,
              tripType: tripType,
            },
          });
        }
      }
    }
  };

  //Chọn vé phổ thông/ thương gia.
  const handleFareSelect = (
    fare:
      | "economySaver"
      | "economyStandard"
      | "businessSaver"
      | "businessStandard"
  ) => {
    setSelectedFare(fare);
  };

  if (flights.length === 0) {
    return (
      <div className="flight-results">
        <h2>Kết quả tìm kiếm chuyến bay</h2>
        <p>Không tìm thấy chuyến bay nào phù hợp với tìm kiếm của bạn.</p>
        <button
          className="home-button"
          style={{ margin: "20px" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Quay lại trang chủ
        </button>
      </div>
    );
  }

  return (
    <div className="flight-results">
      <h2>Kết quả tìm kiếm chuyến bay</h2>
      {currentFlights.map((flight) => (
        <div key={flight.flight_id} className="flight-item">
          <div className="flight-info">
            <div className="time-details">
              <p className="date">
                {new Date(flight.departure_time).toLocaleDateString()}
              </p>
              <strong className="time">
                {new Date(flight.departure_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </strong>
              <p className="location">{flight.departure}</p>
            </div>

            <div className="duration">
              <p className="duration-time">
                {calculateDuration(flight.departure_time, flight.arrival_time)}
              </p>
              <p className="arrow">→</p>
            </div>

            <div className="time-details">
              <p className="date">
                {new Date(flight.arrival_time).toLocaleDateString()}
              </p>
              <strong className="time">
                {new Date(flight.arrival_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </strong>
              <p className="location">{flight.arrival}</p>
            </div>

            <div className="airline-box">
              <p className="airline">
                Hãng: <strong>{flight.brand}</strong>
              </p>
            </div>
            <div className="flight-number-box">
              <p className="flight-number">
                Số hiệu: <strong>{flight.flight_id}</strong>
              </p>
            </div>
            <div className="seats-info">
              <p className="seats-left">
                Còn <strong>{flight.available_seats}</strong> ghế
              </p>
            </div>
          </div>
          <div className="fare-options">
            <div
              className={`fare-option economy ${
                selectedFare === "economySaver" ||
                selectedFare === "economyStandard"
                  ? "selected"
                  : ""
              }`}
              onClick={() => {
                handleFareSelect("economySaver");
                toggleDetails(flight.flight_id);
              }}
            >
              <p>Phổ thông</p>
              <span>
                {calculateTotalPrice(flight.price).toLocaleString("vi-VN")} VND
              </span>
              <div className="dropdown">▼</div>
            </div>
            <div
              className={`fare-option business ${
                selectedFare === "businessSaver" ||
                selectedFare === "businessStandard"
                  ? "selected"
                  : ""
              }`}
              onClick={() => {
                handleFareSelect("businessSaver");
                toggleDetails(flight.flight_id);
              }}
            >
              <p>Thương gia</p>
              <span>
                {calculateTotalPrice(flight.price * 1.5).toLocaleString(
                  "vi-VN"
                )}{" "}
                VND
              </span>
              <div className="dropdown">▼</div>
            </div>
          </div>
          {expandedFlightId === flight.flight_id && (
            <div className="fare-selection">
              {(selectedFare === "economySaver" ||
                selectedFare === "economyStandard") && (
                <>
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
                        <h3 style={{ color: "#f0584d" }}>
                          <strong>
                            {calculateTotalPrice(flight.price).toLocaleString(
                              "vi-VN"
                            )}{" "}
                            VND
                          </strong>
                        </h3>
                        <p>
                          <strong>Thay đổi vé:</strong>
                          <br /> Phí đổi vé bay tối đa 860.000 VND mỗi hành
                          khách
                        </p>
                        <p>
                          <strong>Hoàn vé:</strong>
                          <br />
                          Phí hoàn vé tối đa 860.000 VND mỗi hành khách
                        </p>
                        <p>
                          <strong>Hành lí kí gửi:</strong>
                          <br />
                          15kg miễn phí
                        </p>
                        <p>
                          <strong>Hành lí xách tay:</strong>
                          <br />
                          7kg miễn phí
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
                        <h3 style={{ color: "#f0584d" }}>
                          <strong>
                            {calculateTotalPrice(
                              flight.price + 500000
                            ).toLocaleString("vi-VN")}
                            VND
                          </strong>
                        </h3>
                        <p>
                          <strong>Thay đổi vé:</strong>
                          <br /> Phí đổi vé bay tối đa 460.000 VND mỗi hành
                          khách
                        </p>
                        <p>
                          <strong>Hoàn vé:</strong>
                          <br />
                          Phí hoàn vé tối đa 460.000 VND mỗi hành khách
                        </p>
                        <p>
                          <strong>Hành lí kí gửi:</strong>
                          <br />
                          20kg miễn phí
                        </p>
                        <p>
                          <strong>Hành lí xách tay:</strong>
                          <br />
                          12kg miễn phí
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {(selectedFare === "businessSaver" ||
                selectedFare === "businessStandard") && (
                <>
                  <div className="fare-box3"></div>
                  <div className="fare-box1">
                    <div
                      className={`fare-box ${
                        selectedFare === "businessSaver" ? "selected" : ""
                      }`}
                      onClick={() => setSelectedFare("businessSaver")}
                    >
                      <h3>Thương gia tiêu chuẩn</h3>
                      <div className="fare-details">
                        <h3 style={{ color: "#f0584d" }}>
                          <strong>
                            {calculateTotalPrice(
                              flight.price * 1.5
                            ).toLocaleString("vi-VN")}{" "}
                            VND
                          </strong>
                        </h3>
                        <p>
                          <strong>Thay đổi vé:</strong>
                          <br /> Phí đổi vé bay tối đa 360.000 VND mỗi hành
                          khách
                        </p>
                        <p>
                          <strong>Hoàn vé:</strong>
                          <br />
                          Phí hoàn vé tối đa 360.000 VND mỗi hành khách
                        </p>
                        <p>
                          <strong>Hành lí kí gửi:</strong>
                          <br />
                          25kg miễn phí
                        </p>
                        <p>
                          <strong>Hành lí xách tay:</strong>
                          <br />
                          15kg miễn phí
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="fare-box2">
                    <div
                      className={`fare-box ${
                        selectedFare === "businessStandard" ? "selected" : ""
                      }`}
                      onClick={() => setSelectedFare("businessStandard")}
                    >
                      <h3>Thương gia linh hoạt</h3>
                      <div className="fare-details">
                        <h3 style={{ color: "#f0584d" }}>
                          <strong>
                            {calculateTotalPrice(
                              flight.price * 1.5 + 700000
                            ).toLocaleString("vi-VN")}{" "}
                            VND
                          </strong>
                        </h3>
                        <p>
                          <strong>Thay đổi vé:</strong>
                          <br /> Phí đổi vé bay tối đa 180.000 VND mỗi hành
                          khách
                        </p>
                        <p>
                          <strong>Hoàn vé:</strong>
                          <br />
                          Phí hoàn vé tối đa 180.000 VND mỗi hành khách
                        </p>
                        <p>
                          <strong>Hành lí kí gửi:</strong>
                          <br />
                          30kg miễn phí
                        </p>
                        <p>
                          <strong>Hành lí xách tay:</strong>
                          <br />
                          20kg miễn phí
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="button-container">
                <button onClick={handleConfirmBooking}>
                  Xác nhận và đặt vé
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`page-button ${currentPage === i + 1 ? "active" : ""}`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {/* Nút quay lại trang chủ */}
      <div className="home-button-container">
        <button
          className="home-button"
          onClick={() => {
            setIsSearching(false);
            window.scrollTo(0, 0);
          }}
        >
          Quay lại trang chủ
        </button>
      </div>
    </div>
  );
};

export default FlightResults;
