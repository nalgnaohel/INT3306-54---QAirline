import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import './Chart3.css';

interface Chart3Props {
  data: Array<{ [key: string]: number | string }>;
  title: string;
  keys: Array<{ id: string; name: string; color: string }>;
}

// CustomBar component for rounded corners
const CustomBar: React.FC<any> = (props) => {
  const { x, y, width, height, fill } = props;
  const radius = 10;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      rx={radius} // Rounded corners
      ry={radius}
    />
  );
};

const Chart3: React.FC<Chart3Props> = ({ data, title, keys }) => {
  return (
    <div className="chart3-container">
      <div className="chart3-header">
        <h3 className="chart3-title">{title}</h3>
      </div>
      {/* Custom Legend */}
      <div className="chart3-legend">
        {keys.map((key, index) => (
          <div key={index} className="chart3-legend-item">
            <span
              className="chart3-legend-dot"
              style={{ backgroundColor: key.color }}
            ></span>
            <span className="chart3-legend-text">{key.name}</span>
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="5 5" stroke="#eaeaea" vertical={false} />
          <XAxis 
            dataKey="month"
            tick={{ fill: "#999", fontSize: 12 }}
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            tick={{ fill: "#999", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip />
          {keys.map((key) => (
            <Bar
              key={key.id}
              dataKey={key.id}
              fill={key.color}
              barSize={20}
              animationEasing='ease-in-out'
              animationDuration={2000}
              shape={<CustomBar />}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart3;
