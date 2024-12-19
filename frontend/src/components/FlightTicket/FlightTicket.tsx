import React from "react";
import {
  FaPlane,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
  FaBarcode,
} from "react-icons/fa";
import "./FlightTicket.css";

interface FlightTicketProps {
  onClose: () => void;
}

export default function FlightTicket({ onClose }: FlightTicketProps) {
  return (
    <div className="ticket-container">
      <div className="ticket-content">
        <button className="close-button" onClick={onClose} aria-label="Close">
          <svg
            className="icon-close"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="ticket-header">
          <h2 className="airline-name">Vietnam Airlines</h2>
          <FaPlane className="plane-icon" />
        </div>

        <div className="ticket-details">
          <div className="ticket-row">
            <div className="ticket-info">
              <p className="label">Passenger</p>
              <p className="info">
                <FaUser className="icon" />
                Nguyen Van A
              </p>
            </div>
            <div className="ticket-info">
              <p className="label">Flight</p>
              <p className="info">VN123</p>
            </div>
          </div>

          <div className="ticket-row">
            <div className="ticket-info">
              <p className="label">Date</p>
              <p className="info">
                <FaCalendarAlt className="icon" />
                20 Jun 2023
              </p>
            </div>
            <div className="ticket-info">
              <p className="label">Time</p>
              <p className="info">
                <FaClock className="icon" />
                10:30 AM
              </p>
            </div>
          </div>

          <div className="ticket-row">
            <div className="ticket-info">
              <p className="label">From</p>
              <p className="info">
                <FaMapMarkerAlt className="icon" />
                Hanoi (HAN)
              </p>
            </div>
            <FaPlane className="plane-arrow" />
            <div className="ticket-info">
              <p className="label">To</p>
              <p className="info">
                <FaMapMarkerAlt className="icon" />
                Ho Chi Minh (SGN)
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="ticket-footer">
        <div className="footer-info">
          <p className="label">Gate</p>
          <p className="footer-value">A12</p>
        </div>
        <div className="footer-info">
          <p className="label">Seat</p>
          <p className="footer-value">15B</p>
        </div>
        <FaBarcode className="barcode" />
      </div>
    </div>
  );
}
