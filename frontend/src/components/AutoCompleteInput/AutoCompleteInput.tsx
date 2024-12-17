import React, { useState, useEffect, useRef } from "react";
import airportsData from "./FlightPlaces.json"; // Import dữ liệu sân bay
import "./AutoCompleteInput.css";

interface Airport {
  city: string;
  code: string;
  country: string;
}

interface AutoCompleteInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<Airport[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const allAirports: Airport[] = airportsData.flatMap(
    (region) => region.airports
  );

  // Xử lý khi người dùng nhập liệu
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    if (inputValue) {
      const filtered = allAirports.filter((airport) =>
        airport.city.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  // Xử lý khi chọn gợi ý
  const handleSuggestionClick = (airport: Airport) => {
    onChange(`${airport.city} (${airport.code})`);
    setShowSuggestions(false);
  };

  // Hiển thị gợi ý khi input được focus
  const handleInputFocus = () => {
    const filtered = allAirports.filter((airport) =>
      airport.city.toLowerCase()
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  // Ẩn gợi ý khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="autocomplete-wrapper" ref={suggestionsRef}>
      <label>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        autoComplete="off"
      />
      {showSuggestions && (
        <div className="suggestions">
          {filteredSuggestions.map((airport, index) => (
            <div key={index} onClick={() => handleSuggestionClick(airport)}>
              {airport.city} ({airport.code}) - {airport.country}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoCompleteInput;
