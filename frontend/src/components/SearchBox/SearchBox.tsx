import React, { useState, useEffect, useRef } from "react";
import TopNavBar from "../Navbar/TopNavBar";
import "./SearchBox.css";
import AutoCompleteInput from "../AutoCompleteInput/AutoCompleteInput";
import { Navigate, useNavigate } from "react-router-dom";

const tabs = document.querySelectorAll(".tab");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
  });
});

interface SearchBoxProps {
  setReturnFlights: React.Dispatch<React.SetStateAction<any[]>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  setFilteredFlights: React.Dispatch<React.SetStateAction<any[]>>;
  setPassengerCounts: React.Dispatch<
    React.SetStateAction<{ adult: number; child: number; infant: number }>
  >;
  setTripType: React.Dispatch<React.SetStateAction<string>>;
}

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

// const formatTime = (time: string) => {
//   const date = new Date(time);
//   return format(date, "dd:mm:yyyy");
// };

const SearchBox: React.FC<SearchBoxProps> = ({
  setReturnFlights,
  setIsSearching,
  setFilteredFlights,
  setPassengerCounts,
  setTripType,
}) => {
  const navigate = useNavigate();
  const [departure, setDeparture] = useState("");
  const [departure2, setDeparture2] = useState("");
  const [destination, setDestination] = useState("");
  const [destination2, setDestination2] = useState("");
  const [departureDate, setDepartureDate] = useState<string>("");
  const [departureDate2, setDepartureDate2] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const [tripTypeState, setTripTypeState] = useState("one-way");
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);

  const today = new Date().toISOString().split("T")[0];

  const [bookingCode, setBookingCode] = useState("");
  const [email, setEmail] = useState("");
  interface Reservation {
    flight_id: string;
    brand: string;
    departure: string;
    arrival: string;
    departure_time: string;
    arrival_time: string;
    price: number;
    available_seats: number;
  }

  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState("Mua vé");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);

  const decrement = (type: string) => {
    if (type === "adult" && adultCount > 1) setAdultCount(adultCount - 1);
    if (type === "child" && childCount > 0) setChildCount(childCount - 1);
    if (type === "infant" && infantCount > 0) setInfantCount(infantCount - 1);
  };

  const increment = (type: string) => {
    if (type === "adult") setAdultCount(adultCount + 1);
    if (type === "child") setChildCount(childCount + 1);
    if (type === "infant") setInfantCount(infantCount + 1);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const getPassengerLabel = () => {
    const adultText =
      adultCount === 1 ? "1 người lớn" : `${adultCount} người lớn`;
    const childText = childCount === 0 ? "" : `${childCount} trẻ em`;
    const infantText = infantCount === 0 ? "" : `${infantCount} trẻ sơ sinh`;

    const passengers = [adultText, childText, infantText]
      .filter(Boolean)
      .join(", ");
    return passengers;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        labelRef.current &&
        !labelRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    console.log(departure, destination, departureDate, returnDate);
    const departureCode = departure.match(/\((.*?)\)/)?.[1];
    const destinationCode = destination.match(/\((.*?)\)/)?.[1];

    const fetchFlights = async () => {
      try {
        const url = `http://127.0.0.1:5000/api/flight/onewayflight?departure=${departureCode}&arrival=${destinationCode}&departureDate=${departureDate}`;
        console.log("Fetching URL:", url);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data);

        const { flights } = data;
        setFilteredFlights(flights);
        setIsSearching(true);
        setPassengerCounts({
          adult: adultCount,
          child: childCount,
          infant: infantCount,
        });
        setTripType(tripTypeState);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFlights();

    if (tripTypeState === "round-trip") {
      const fetchReturnFlights = async () => {
        try {
          const urlReturn = `http://127.0.0.1:5000/api/flight/onewayflight?departure=${destinationCode}&arrival=${departureCode}&departureDate=${returnDate}`;
          console.log("Fetching Return URL:", urlReturn);

          const response1 = await fetch(urlReturn);

          if (!response1.ok) {
            throw new Error(`Error: ${response1.status}`);
          }

          const dataReturn = await response1.json();
          console.log("Fetched Return Data:", dataReturn);

          const { flights: flightsReturn } = dataReturn;
          setReturnFlights(flightsReturn);
        } catch (error) {
          console.error(error);
        }
      };

      fetchReturnFlights();
    }
  };

  const handleFetchReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setReservation(null);

    if (!bookingCode || !email) {
      setError("Vui lòng nhập đầy đủ mã đặt chỗ và email.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/ticket/tickets/${bookingCode}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setReservation(data);
      console.log("Reservation fetched successfully:", data);

      // Navigate after successfully fetching the data
      navigate("/flight", {
        state: {
          flight_id: data.flight_id,
          departure: data.departure,
          arrival: data.arrival,
          departure_time: data.departure_time,
          arrival_time: data.arrival_time,
          seat_number: data.seat_number,
          price: data.price,
          email: email,
          bookingCode: bookingCode,
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Đã xảy ra lỗi khi tìm kiếm đặt chỗ.");
      }
    }
  };

  const handleSeatManage = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!bookingCode || !email) {
      setError("Vui lòng nhập đầy đủ mã đặt chỗ và email.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/ticket/tickets/${bookingCode}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(" fetched successfully:", data);

      // Navigate after successfully fetching the data
      navigate("/seat-management", {
        state: {
          flight_id: data.flight_id,
          departure: data.departure,
          arrival: data.arrival,
          departure_time: data.departure_time,
          arrival_time: data.arrival_time,
          seat_number: data.seat_number,
          price: data.price,
          email: email,
          bookingCode: bookingCode,
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Đã xảy ra lỗi khi tìm kiếm đặt chỗ.");
      }
    }
  };

  return (
    <>
      <TopNavBar />
      <div className="search-box">
        <div className="hero-section">
          <div className="infor">
            <h1>WELCOME TO QAIRLINE</h1>
            <p>
              Book your travel and enjoy luxury redefined at the most affordable
              rates.
            </p>
          </div>
        </div>
        <div className="form-section">
          <div className="tabs">
            <div
              className={`tab ${activeTab === "Mua vé" ? "active" : ""}`}
              onClick={() => handleTabClick("Mua vé")}
            >
              Mua vé
            </div>
            <div
              className={`tab ${
                activeTab === "Quản lý đặt chỗ" ? "active" : ""
              }`}
              onClick={() => handleTabClick("Quản lý đặt chỗ")}
            >
              Quản lý đặt chỗ
            </div>
            <div
              className={`tab ${activeTab === "Làm thủ tục" ? "active" : ""}`}
              onClick={() => handleTabClick("Làm thủ tục")}
            >
              Làm thủ tục
            </div>
          </div>

          {activeTab === "Mua vé" && (
            <div className="form">
              <div className="form-group-1">
                <label>
                  <input
                    type="radio"
                    name="trip-type"
                    value="one-way"
                    checked={tripTypeState === "one-way"}
                    onChange={(e) => setTripTypeState(e.target.value)}
                  />
                  Một chiều
                </label>
                <label>
                  <input
                    type="radio"
                    name="trip-type"
                    value="round-trip"
                    checked={tripTypeState === "round-trip"}
                    onChange={(e) => setTripTypeState(e.target.value)}
                  />
                  Khứ hồi
                </label>
                <label>
                  <input
                    type="radio"
                    name="trip-type"
                    value="multi-city"
                    checked={tripTypeState === "multi-city"}
                    onChange={(e) => setTripTypeState(e.target.value)}
                  />
                  Nhiều chặng
                </label>
              </div>
              <div className="inputs">
                <AutoCompleteInput
                  label="Từ"
                  placeholder="Chọn điểm khởi hành ..."
                  value={departure}
                  onChange={setDeparture}
                />
                <AutoCompleteInput
                  label="Đến"
                  placeholder="Chọn điểm đến ..."
                  value={destination}
                  onChange={setDestination}
                />
                {tripTypeState === "one-way" && (
                  <div>
                    <label>Ngày khởi hành</label>
                    <input
                      type="date"
                      min={today}
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                    />
                  </div>
                )}
                {tripTypeState === "round-trip" && <div></div>}
                {tripTypeState === "round-trip" && (
                  <div>
                    <label>Ngày khởi hành</label>
                    <input
                      type="date"
                      min={today}
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                    />
                  </div>
                )}
                {tripTypeState === "round-trip" && (
                  <div>
                    <label>Ngày về</label>
                    <input
                      type="date"
                      min={today}
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                    />
                  </div>
                )}
                {tripTypeState === "multi-city" && (
                  <div>
                    <label>Ngày khởi hành</label>
                    <input type="date" min={today} />
                  </div>
                )}
                {tripTypeState === "multi-city" && (
                  <AutoCompleteInput
                    label="Từ"
                    placeholder="Chọn điểm khởi hành ..."
                    value={departure2}
                    onChange={setDeparture2}
                  />
                )}
                {tripTypeState === "multi-city" && (
                  <AutoCompleteInput
                    label="Đến"
                    placeholder="Chọn điểm đến ..."
                    value={destination2}
                    onChange={setDestination2}
                  />
                )}
                {tripTypeState === "multi-city" && (
                  <div>
                    <label>Ngày khởi hành</label>
                    <input type="date" min={today} />
                  </div>
                )}
                <div className="passenger-section">
                  <label>Số hành khách</label>
                  <label
                    className="passenger-label"
                    onClick={toggleDropdown}
                    ref={labelRef}
                  >
                    {getPassengerLabel()}
                    <span className="dropdown-arrow"></span>
                  </label>
                  {isDropdownOpen && (
                    <div className="passenger-dropdown" ref={dropdownRef}>
                      <div className="passenger-item">
                        <label>Người lớn</label>
                        <div className="passenger-controls">
                          <button
                            className="dec"
                            onClick={() => decrement("adult")}
                          >
                            -
                          </button>
                          <span>{adultCount}</span>
                          <button onClick={() => increment("adult")}>+</button>
                        </div>
                      </div>
                      <div className="passenger-item">
                        <label>Trẻ em</label>
                        <div className="passenger-controls">
                          <button
                            className="dec"
                            onClick={() => decrement("child")}
                          >
                            -
                          </button>
                          <span>{childCount}</span>
                          <button onClick={() => increment("child")}>+</button>
                        </div>
                      </div>
                      <div className="passenger-item">
                        <label>Trẻ sơ sinh</label>
                        <div className="passenger-controls">
                          <button
                            className="dec"
                            onClick={() => decrement("infant")}
                          >
                            -
                          </button>
                          <span>{infantCount}</span>
                          <button onClick={() => increment("infant")}>+</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="search-button-container">
                <button className="search-button" onClick={handleSearch}>
                  Tìm chuyến bay
                </button>
              </div>
            </div>
          )}

          {activeTab === "Quản lý đặt chỗ" && (
            <div className="manage-tab">
              <form onSubmit={handleSeatManage}>
                <div className="form-group-2">
                  <label>Mã đặt chỗ / Số vé điện tử</label>
                  <input
                    type="text"
                    placeholder="Mã đặt chỗ / Số vé điện tử"
                    value={bookingCode}
                    onChange={(e) => setBookingCode(e.target.value)}
                  />
                </div>
                <div className="form-group-2">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button type="submit">Tìm kiếm</button>
              </form>
            </div>
          )}
          {activeTab === "Làm thủ tục" && (
            <div className="manage-tab">
              <form onSubmit={handleFetchReservation}>
                <div className="form-group-2">
                  <label>Mã đặt chỗ / Số vé điện tử</label>
                  <input
                    type="text"
                    placeholder="Mã đặt chỗ / Số vé điện tử"
                    value={bookingCode}
                    onChange={(e) => setBookingCode(e.target.value)}
                  />
                </div>
                <div className="form-group-2">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button type="submit">Tìm kiếm</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBox;
