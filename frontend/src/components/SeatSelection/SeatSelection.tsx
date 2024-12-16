import React, { useState } from "react";
import "./SeatSelection.css";

interface SeatRow {
  [key: string]: "available" | "blocked" | "selected";
}

interface SeatSelectionProps {
  onBack: () => void;
  onContinue: () => void;
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
}) => {
  const [seats, setSeats] = useState<SeatRow[]>(initialSeats);
  const [selectedSeat, setSelectedSeat] = useState<{
    row: number;
    col: string;
  } | null>(null);

  const handleSeatClick = (rowIndex: number, col: string) => {
    if (seats[rowIndex][col] === "available") {
      setSelectedSeat({ row: rowIndex, col });
    }
  };

  return (
    <div className="seat-selection-container">
      <header className="header">
        <div className="logo">✈️ Airline</div>
        <nav>
          <ul className="nav-links">
            <li>Trang chủ</li>
            <li>Chuyến bay</li>
            <li>Tin tức</li>
            <li>Liên hệ</li>
          </ul>
        </nav>
      </header>
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

        <div className="actions">
          <button className="back-btn" onClick={onBack}>
            Quay Lại
          </button>
          <button
            className="continue-btn"
            onClick={onContinue}
            disabled={!selectedSeat}
          >
            Tiếp Tục
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
