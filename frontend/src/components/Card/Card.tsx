import React from "react";
import "./Card.css";

interface CardProps {
  title: string;
  value: string;
  percentage: string;
  isPositive: boolean;
  chartData: string; // Optional for passing chart path
}

const Card: React.FC<CardProps> = ({ title, value, percentage, isPositive, chartData }) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-title-admin">{title}</div>
        <div className="card-value-percent-chart">
          <div className="card-value-percent">
          <div className="card-value">{value}</div>
          <div
            className={`card-percentage ${
              isPositive ? "positive" : "negative"
            }`}
          >
            {isPositive ? `+${percentage}` : `${percentage}`}
          </div>
          </div>
          <div className="card-chart">
          <svg
            viewBox="0 0 100 50"
            className="mini-chart"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={chartData}
              fill="none"
              stroke={isPositive ? "green" : "red"}
              strokeWidth="2"
            />
          </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
