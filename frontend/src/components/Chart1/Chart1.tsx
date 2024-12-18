import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import "./Chart1.css";

interface ChartProps {
  data: Array<{ [key: string]: number | string }>;
  dataKeys: { name: string; color: string }[];
  title: string;
}

const Chart1: React.FC<ChartProps> = ({ data, dataKeys, title }) => {
  return (
    <div className="chart1-container">
      <h3 className="chart-title">{title}</h3>
      <LineChart width={650} height={300} data={data} className="line-chart">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {dataKeys.map((key, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={key.name}
            stroke={key.color}
            dot={false}
            strokeWidth={2}
            animationDuration={1000} // Line animation
          />
        ))}
      </LineChart>
    </div>
  );
};

export default Chart1;
