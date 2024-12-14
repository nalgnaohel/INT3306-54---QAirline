import React, { useState } from "react";
import "./SeatSelection.css";

interface SeatRow {
  [key: string]: "available" | "blocked";
}

interface SeatSelectionProps {
  onBack: () => void;
  onContinue: () => void;
}

const rows = 19;
const columns = ["A", "B", "C", "D", "E", "G"];

const initialSeats: SeatRow[] = Array.from({ length: rows }, () =>
  columns.reduce((acc, col) => ({ ...acc, [col]: "available" }), {} as SeatRow)
);

// Sample blocked seats for demonstration
initialSeats[16]["A"] = "blocked";
initialSeats[16]["B"] = "blocked";
initialSeats[16]["C"] = "blocked";
initialSeats[16]["D"] = "blocked";
initialSeats[16]["E"] = "blocked";
initialSeats[16]["G"] = "blocked";

const SeatSelection: React.FC<SeatSelectionProps> = ({
  onBack,
  onContinue,
}) => {
  const [seats, setSeats] = useState<SeatRow[]>(initialSeats);
  const [selectedSeat, setSelectedSeat] = useState<{
    row: number;
    col: string;
  } | null>(null);

  const handleSeatClick = (row: number, col: string) => {
    if (seats[row][col] === "available") {
      setSelectedSeat({ row, col });
    }
  };

  return (
    <div className="seat-selection-container">
      <h2>Chọn Ghế Ngồi Của Bạn</h2>
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
  );
};

export default SeatSelection;
