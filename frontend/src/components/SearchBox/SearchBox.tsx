import React, { useState, useEffect, useRef } from "react";
import TopNavBar from "../Navbar/TopNavBar";
import "./SearchBox.css";
import AutoCompleteInput from "../AutoCompleteInput/AutoCompleteInput";
// import { format } from "date-fns";

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

  const [flights, setFlights] = useState<Flight[]>([]);
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/flight/all"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setFlights(data.flights.flights);
        console.log(flights);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(String(error));
        }
      } finally {
      }
    };

    fetchFlights();
  }, []);

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
    const filtered = flights.filter((flight) => {
      const isDepartureMatch = departure
        ? departure.split("(")[1].substring(0, 3) === flight.departure_code
        : true;
      console.log(flight.departure_code, departure.split("(")[1].substring(0, 3));
      const isDestinationMatch = destination
        ? destination.split("(")[1].substring(0, 3) === flight.arrival_code
        : true;
      const isDateMatch = departureDate
        ? flight.departure_time.startsWith(departureDate)
        : true;

      return isDepartureMatch && isDestinationMatch && isDateMatch;
    });

    if (tripTypeState === "round-trip") {
      // Lọc các chuyến bay ngược lại
      const returnFlights = flights.filter((flight) => {
        const isDepartureMatch = departure
          ? flight.departure_code === destination.split("(")[1].substring(0, 3)
          : true; 
        const isDestinationMatch = departure
          ? flight.arrival_code === departure.split("(")[1].substring(0, 3)
          : true;
        const isDateMatch = returnDate
          ? flight.departure_time.startsWith(returnDate)
          : true;

        return isDepartureMatch && isDestinationMatch && isDateMatch;
      });
      setReturnFlights(returnFlights);
    }
    setIsSearching(true);
    setFilteredFlights(filtered);
    setPassengerCounts({
      adult: adultCount,
      child: childCount,
      infant: infantCount,
    });
    setTripType(tripTypeState);
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
                    <input type="date" min={today} />
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
              <form>
                <div className="form-group-2">
                  <label>Mã đặt chỗ / Số vé điện tử</label>
                  <input type="text" placeholder="Mã đặt chỗ / Số vé điện tử" />
                </div>
                <div className="form-group-2">
                  <label>Họ</label>
                  <input type="text" placeholder="Họ" />
                </div>
                <button type="submit">Tìm kiếm</button>
              </form>
            </div>
          )}
          {activeTab === "Làm thủ tục" && (
            <div className="manage-tab">
              <form>
                <div className="form-group-2">
                  <label>Mã đặt chỗ / Số vé điện tử</label>
                  <input type="text" placeholder="Mã đặt chỗ / Số vé điện tử" />
                </div>
                <div className="form-group-2">
                  <label>Họ</label>
                  <input type="text" placeholder="Họ" />
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
