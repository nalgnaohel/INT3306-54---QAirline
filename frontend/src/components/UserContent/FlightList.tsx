import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlightItem, { FlightItemProps } from "./FlightItem";
import { useUserContext } from "./UserContext";
import "./FlightList.css";

const FlightList: React.FC<{ flights: FlightItemProps[] }> = ({ flights }) => {
  const [isListOpen, setIsListOpen] = useState(true); // Quản lý trạng thái mở/đóng của danh sách
  const { activeContent } = useUserContext();

  useEffect(() => {
    // Nếu activeContent là 2, mở danh sách, ngược lại đóng
    if (activeContent === 2) {
      setIsListOpen(true);
    } else {
      setIsListOpen(false);
    }
  }, [activeContent]);

  return (
    <div className="flight-list-container">
      <AnimatePresence>
        {isListOpen && (
          <div className="flight-list">
            {flights.map((flight, index) => (
              <motion.div
                key={flight.ticketid}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1, // Thêm độ trễ biến mất cho từng item
                }}
              >
                <FlightItem {...flight} />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlightList;
