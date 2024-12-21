import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import plane from "../../assets/images/air-freight.png"
import "./Chart5.css";

interface Chart5Data {
  name: string;
  value: number;
  color: string;
}

interface Chart5Props {
  data: Chart5Data[];
  title: string;
}

const Chart5: React.FC<Chart5Props> = ({ data, title}) => {
  const radiusOuter = 90; // Adjust for the size of the outer pie

  return (
    <div className="chart5-container">
      <h3 className="chart5-title">{title}</h3>
      <img src={plane} />
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={radiusOuter}
          innerRadius={radiusOuter - 12}
          startAngle={90}
          endAngle={450}
          paddingAngle={5}
          cornerRadius={10}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Pie
          data={[{ value: 100 }]} // Inner circle with airplane icon
          dataKey="value"
          stroke="none"
          cx="50%"
          cy="50%"
          outerRadius={radiusOuter - 45}
          fill="#ffccff"
          innerRadius={0}
          isAnimationActive={false}
        />
      </PieChart>
      <div className="chart5-legend">
        {data.map((entry) => (
          <div key={entry.name} className="chart5-legend-item">
            <span
              className="chart5-legend-color"
              style={{ backgroundColor: entry.color }}
            />
            <span className="chart5-legend-text">{entry.name}</span>
            <span className="chart5-legend-value">{entry.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart5;
