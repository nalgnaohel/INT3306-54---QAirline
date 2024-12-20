import React, { useState } from "react";
import "./SeatSelection.css";

interface SeatRow {
  [key: string]: "available" | "blocked" | "selected";
}

interface SeatSelectionProps {
  onBack: () => void;
  onContinue: () => void;
  setSeatNumber: (seatNumber: string) => void;
  bookingCode: string;
}

const rows = 10;
const columns = ["A", "B", "C", "D", "E", "G"];

const initialSeats: SeatRow[] = Array.from({ length: rows }, () => {
  const row: SeatRow = {};
  columns.forEach((col) => {
    row[col] = "available";
  });
  return row;
});

const SeatSelection: React.FC<SeatSelectionProps> = ({
  onBack,
  onContinue,
  setSeatNumber,
  bookingCode,
}) => {
  const [seats, setSeats] = useState<SeatRow[]>(initialSeats);
  const [selectedSeat, setSelectedSeat] = useState<{
    row: number;
    col: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSeatClick = (rowIndex: number, col: string) => {
    if (seats[rowIndex][col] === "available") {
      setSelectedSeat({ row: rowIndex, col });
    }
  };

  const handleContinue = async () => {
    if (!selectedSeat) return;

    const seatNumber = `${selectedSeat.row + 1}${selectedSeat.col}`;
    console.log("Selected Seat Number:", seatNumber);

    // Giả sử bạn có thông tin vé, như `bookingCode`, `email`, v.v.
    const ticketUpdateData = {
      seat_number: seatNumber,
      // Các thông tin khác của vé nếu cần (ví dụ: email, flightID, v.v.)
      // Bạn có thể lấy các thông tin này từ props hoặc từ state
      ticket_id: bookingCode,
      // flight_id: "yourFlightID",  // Nếu cần
      // email: "user@example.com",   // Nếu cần
      // Các thông tin khác có thể bao gồm departure, arrival, v.v.
    };

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/ticket/tickets/${bookingCode}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ticketUpdateData),
        }
      );

      if (!response.ok) {
        const responseText = await response.text(); // Đọc nội dung lỗi từ response
        console.error("Response Status:", response.status);
        console.error("Response Text:", responseText);

        throw new Error(
          `Failed to update ticket: ${response.status} - ${responseText}`
        );
      }

      setSeatNumber(seatNumber);

      onContinue();
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error:", err.message);
        setError(err.message);
      } else {
        console.error("Unexpected Error:", err);
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="seat-selection-container">
      <div className="progress-steps">
        <div className="step completed">✔ Chi tiết chuyến bay</div>
        <div className="step completed">✔ Hành khách</div>
        <div className="step active">3 Chọn ghế</div>
        <div className="step">4 Xác nhận</div>
      </div>
      <div className="seat-card">
        <h2>Chọn Ghế Ngồi Của Bạn</h2>
        <div className="seat-selection-content">
          <div className="legend">
            <div className="legend-item">
              <div className="seat selected"></div> Chỗ ngồi đã chọn
            </div>
            <div className="legend-item">
              <div className="seat available"></div> Chỗ ngồi còn trống
            </div>
            <div className="legend-item">
              <div className="seat blocked"></div> Hàng ghế được chặn
            </div>
          </div>
          <div className="seat-map">
            <div className="seat-map-header">
              <div className="seat-placeholder"></div>
              {columns.map((col) => (
                <div key={col} className="seat-header">
                  {col}
                </div>
              ))}
            </div>

            {seats.map((row, rowIndex) => (
              <div key={rowIndex} className="seat-row">
                <div className="row-number">{rowIndex + 1}</div>
                {columns.map((col) => {
                  const seatStatus = row[col];
                  const isSelected =
                    selectedSeat &&
                    selectedSeat.row === rowIndex &&
                    selectedSeat.col === col;

                  return (
                    <div
                      key={col}
                      className={`seat ${seatStatus} ${
                        isSelected ? "selected" : ""
                      }`}
                      onClick={() => handleSeatClick(rowIndex, col)}
                    >
                      {col}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="actions">
          <button className="back-btn" onClick={onBack}>
            Quay Lại
          </button>
          <button
            className="continue-btn"
            onClick={handleContinue}
            disabled={!selectedSeat || loading}
          >
            {loading ? "Đang xử lý..." : "Tiếp Tục"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
