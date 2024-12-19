import React from "react";
import Card from "../Card/Card";
import { motion } from "framer-motion";
import "./DashboardAdmin.css";
import Chart1 from "../Chart1/Chart1";
import Chart2 from "../Chart2/Chart2";
import Chart3 from "../Chart3/Chart3";

const DashboardAdmin: React.FC = () => {
  const cardsData = [
    {
      title: "Users",
      value: "21.3K",
      percentage: "-2.5%",
      isPositive: false,
      chartData: "M0,45 L20,20 L40,25 L60,15 L80,35 L100,30",
    },
    {
      title: "Sessions",
      value: "18.5K",
      percentage: "+1.5%",
      isPositive: true,
      chartData: "M0,45 L20,30 L40,25 L60,40 L80,25 L100,15",
    },
    {
      title: "Avg. session duration",
      value: "4m 41s",
      percentage: "-3.5%",
      isPositive: false,
      chartData: "M0,45 L20,35 L40,30 L60,25 L80,20 L100,15",
    },
    {
      title: "Requests received",
      value: "1.2K",
      percentage: "+1.5%",
      isPositive: true,
      chartData: "M0,45 L20,30 L40,35 L60,20 L80,25 L100,15",
    },
  ];

  const userChartData = [
    { date: "Feb 12", MindBrew: 18000, BrainBoosters: 17000 },
    { date: "Feb 13", MindBrew: 17000, BrainBoosters: 19000 },
    { date: "Feb 14", MindBrew: 19000, BrainBoosters: 21000 },
    { date: "Feb 15", MindBrew: 20000, BrainBoosters: 20000 },
    { date: "Feb 16", MindBrew: 21000, BrainBoosters: 18000 },
    { date: "Feb 17", MindBrew: 22000, BrainBoosters: 20000 },
    { date: "Feb 18", MindBrew: 23000, BrainBoosters: 21000 },
  ];

  const userChartKeys = [
    { name: "MindBrew", color: "#4a90e2" },
    { name: "BrainBoosters", color: "#f5a623" },
  ];

  const usersBySource = [
    { name: 'Google', value: 8224, colorClass: 'google' },
    { name: 'Instagram', value: 5255, colorClass: 'instagram' },
    { name: 'Bookmarks', value: 2512, colorClass: 'bookmarks' },
    { name: 'Facebook', value: 1642, colorClass: 'facebook' },
    { name: 'Yahoo', value: 1341, colorClass: 'yahoo' },
    { name: 'Others', value: 2326, colorClass: 'others' },
  ];

  const percentageChange = -2.5;

  const sessionData = [
    { date: '12/02', MindBrew: 18000, BrainBoosters: 19500 },
    { date: '13/02', MindBrew: 19000, BrainBoosters: 19000 },
    { date: '14/02', MindBrew: 18000, BrainBoosters: 19500 },
    { date: '15/02', MindBrew: 16000, BrainBoosters: 17000 },
    { date: '16/02', MindBrew: 19000, BrainBoosters: 19500 },
    { date: '17/02', MindBrew: 20000, BrainBoosters: 20500 },
    { date: '18/02', MindBrew: 21000, BrainBoosters: 21000 },
  ];

  return (
    <div className="dashboard-admin">
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
      <div className="line-chart-1">
        <Chart1
            data={userChartData}
            dataKeys={userChartKeys}
            title="Users"
        />
      </div>
      <div className="bar-chart-1">
        <Chart2 title="Users by source" percentageChange={percentageChange} data={usersBySource} />
      </div>
      <div className="bar-chart-2">
        <Chart3 title="Sessions" data={sessionData} />
      </div>
    </div>
  );
};

export default DashboardAdmin;
