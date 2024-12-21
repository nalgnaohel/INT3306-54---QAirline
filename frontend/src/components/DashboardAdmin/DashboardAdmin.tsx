import React from "react";
import Card from "../Card/Card";
import { motion } from "framer-motion";
import "./DashboardAdmin.css";
import Chart1 from "../Chart1/Chart1";
import Chart2 from "../Chart2/Chart2";
import Chart3 from "../Chart3/Chart3";
import Chart4 from "../Chart4/Chart4";
import Chart5 from "../Chart5/Chart5";

const DashboardAdmin: React.FC = () => {
  const cardsData = [
    {
      title: "Chuyến bay thành công",
      value: "125",
      percentage: "-1.35%",
      isPositive: false,
      chartData: "M0,45 L20,20 L40,25 L60,15 L80,35 L100,30",
    },
    {
      title: "Chuyến bay đang hoạt động",
      value: "80",
      percentage: "+3.68%",
      isPositive: true,
      chartData: "M0,45 L20,30 L40,25 L60,40 L80,25 L100,15",
    },
    {
      title: "Chuyến bay đã hủy",
      value: "25",
      percentage: "-1.45%",
      isPositive: false,
      chartData: "M0,45 L20,35 L40,30 L60,25 L80,20 L100,15",
    },
    {
      title: "Tổng doanh thu",
      value: "15,000.00",
      percentage: "+5.94%",
      isPositive: true,
      chartData: "M0,45 L20,30 L40,35 L60,20 L80,25 L100,15",
    },
  ];

  // const usersBySource = [
  //   { name: 'Việt Nam', value: 8224, colorClass: 'google' },
  //   { name: 'Trung Quốc', value: 5255, colorClass: 'instagram' },
  //   { name: 'Nhật Bản', value: 2512, colorClass: 'bookmarks' },
  //   { name: 'Hàn Quốc', value: 1642, colorClass: 'facebook' },
  //   { name: 'Singapore', value: 1341, colorClass: 'yahoo' },
  //   { name: 'Pháp', value: 2326, colorClass: 'others' },
  // ];

  const chart3Data = [
    { month: 'Th01', domestic: 120, international: 80 },
    { month: 'Th02', domestic: 150, international: 100 },
    { month: 'Th03', domestic: 140, international: 90 },
    { month: 'Th04', domestic: 160, international: 110 },
    { month: 'Th05', domestic: 170, international: 120 },
    { month: 'Th06', domestic: 150, international: 100 },
    { month: 'Th07', domestic: 180, international: 130 },
    { month: 'Th08', domestic: 160, international: 110 },
  ];

  const chart3Keys = [
    { id: "domestic", name: "Trong nước", color: "#fbc02d" },
    { id: "international", name: "Quốc tế", color: "#80bcff" },
  ];

  const chart4Data = [
    { month: "Th01", Income: 12000, Expense: 5000 },
    { month: "Th02", Income: 15000, Expense: 7000 },
    { month: "Th03", Income: 14000, Expense: 8000 },
    { month: "Th04", Income: 16500, Expense: 9000 },
    { month: "Th05", Income: 17000, Expense: 8500 },
    { month: "Th06", Income: 20000, Expense: 9500 },
  ];

  const chart4Keys = [
    { id: "Income", name: "Doanh thu", color: "#fbc02d" },
    { id: "Expense", name: "Chi phí", color: "#80bcff" },
  ];

  const airlinesData = [
    { name: "Vietnam Airline", value: 35, color: "#F5C23B" },
    { name: "	Bamboo Airwayy", value: 30, color: "#80bcff" },
    { name: "VietJet Air", value: 20, color: "#BFBFBF" },
    { name: "Jetstar Airlines", value: 15, color: "#D6D6D6" },
  ];

  const data = [
    { month: 'Th01', ticketsSold: 1500 },
    { month: 'Th02', ticketsSold: 2000 },
    { month: 'Th03', ticketsSold: 1200 },
    { month: 'Th04', ticketsSold: 3800 },
    { month: 'Th05', ticketsSold: 2500 },
    { month: 'Th06', ticketsSold: 3000 },
  ];

  const totalTickets = 12500;

  return (
    <div className="dashboard-admin">
      <div className="row row1">
        {cardsData.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }} // Add delay for each card
          >
            <Card
              title={card.title}
              value={card.value}
              percentage={card.percentage}
              isPositive={card.isPositive}
              chartData={card.chartData}
            />
          </motion.div>
        ))}
      </div>
      <div className="row row2">
        <div className="line-chart-1">
          <Chart1 data={data} title="Bán vé" totalTickets={totalTickets} unit="Vé đã bán" />
        </div>
        <div className="line-chart-2">
          <Chart4 data={chart4Data} title="Lợi nhuận" keys={chart4Keys} />
        </div>
      </div>
      {/* <div className="bar-chart-1">
        <Chart2 title="Điểm đến phổ biến" data={usersBySource} />
      </div> */}
      <div className="row row3">
        <div className="bar-chart-2">
          <Chart3 data={chart3Data} title="Lịch bay" keys={chart3Keys} />
        </div>
        <div className="pie-chart-1">
          <Chart5 data={airlinesData} title="Hãng bay phổ biến" />
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
