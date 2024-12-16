import React, { useState, useEffect, useRef } from "react";
import TopNavBar from "../Navbar/TopNavBar";
import "./SearchBox.css";
import flightsData from "../Flights.json";
import AutoCompleteInput from "../AutoCompleteInput/AutoCompleteInput";

const tabs = document.querySelectorAll(".tab");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
  });
});

interface SearchBoxProps {
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  setFilteredFlights: React.Dispatch<React.SetStateAction<any[]>>;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  setIsSearching,
  setFilteredFlights,
}) => {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [tripType, setTripType] = useState("one-way");
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);

  const [flights, setFlights] = useState<any[]>(flightsData.flights);

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
        ? flight.departure.includes(departure.split(" (")[0])
        : true;
      const isDestinationMatch = destination
        ? flight.destination.includes(destination.split(" (")[0])
        : true;
      // const isDateMatch = departureDate
      //   ? flight.departureTime.startsWith(departureDate)
      //   : true;

      return isDepartureMatch && isDestinationMatch;
    });
    setIsSearching(true);
    setFilteredFlights(filtered);
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
              <div className="form-group">
                <label>
                  <input
                    type="radio"
                    name="trip-type"
                    value="one-way"
                    checked={tripType === "one-way"}
                    onChange={(e) => setTripType(e.target.value)}
                  />
                  Một chiều
                </label>
                <label>
                  <input
                    type="radio"
                    name="trip-type"
                    value="round-trip"
                    checked={tripType === "round-trip"}
                    onChange={(e) => setTripType(e.target.value)}
                  />
                  Khứ hồi
                </label>
                <label>
                  <input
                    type="radio"
                    name="trip-type"
                    value="multi-city"
                    checked={tripType === "multi-city"}
                    onChange={(e) => setTripType(e.target.value)}
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
                {tripType === "one-way" && (
                  <div>
                    <label>Ngày khởi hành</label>
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                    />
                  </div>
                )}
                {tripType === "round-trip" && <div></div>}
                {tripType === "round-trip" && (
                  <div>
                    <label>Ngày khởi hành</label>
                    <input type="date" />
                  </div>
                )}
                {tripType === "round-trip" && (
                  <div>
                    <label>Ngày về</label>
                    <input type="date" />
                  </div>
                )}
                {tripType === "multi-city" && (
                  <div>
                    <label>Ngày khởi hành</label>
                    <input type="date" />
                  </div>
                )}
                {tripType === "multi-city" && (
                  <AutoCompleteInput
                    label="Từ"
                    placeholder="Chọn điểm khởi hành ..."
                    value={departure}
                    onChange={setDeparture}
                  />
                )}
                {tripType === "multi-city" && (
                  <AutoCompleteInput
                    label="Đến"
                    placeholder="Chọn điểm đến ..."
                    value={destination}
                    onChange={setDestination}
                  />
                )}
                {tripType === "multi-city" && (
                  <div>
                    <label>Ngày khởi hành</label>
                    <input type="date" />
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
