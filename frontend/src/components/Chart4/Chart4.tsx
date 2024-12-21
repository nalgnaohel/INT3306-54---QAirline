import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Chart4.css";

interface Chart4Props {
  data: Array<{ [key: string]: number | string }>;
  title: string;
  keys: { id: string; name: string; color: string }[];
}

const Chart4: React.FC<Chart4Props> = ({ data, title, keys }) => {
  return (
    <div className="chart4-container">
        <div className="chart4-header">
            <h3 className="chart4-title">{title}</h3>
        </div>

        {/* Custom Legend */}
        <div className="chart4-legend">
            {keys.map((key, index) => (
                <div key={index} className="chart4-legend-item">
                    <span
                    className="chart4-legend-dot"
                    style={{ backgroundColor: key.color }}
                    ></span>
                    <span className="chart4-legend-text">{key.name}</span>
                </div>
            ))}
        </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
          {/* Grid */}
          <CartesianGrid strokeDasharray="5 5" stroke="#eaeaea" vertical={false}/>
            {/* Axes */}
            <XAxis
              dataKey="month"
              tick={{ fill: "#999", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#999", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            {/* Tooltip */}
            <Tooltip />
            {/* Data Lines */}
            {keys.map((key, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={key.id}
                stroke={key.color}
                strokeWidth={3}
                dot={{ r: 6, fill: key.color}}
                activeDot={{
                  r: 6,
                  fill: "#fff",
                  stroke: key.color,
                  strokeWidth: 4,
                }}
                animationDuration={2000}
              />
            ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart4;
