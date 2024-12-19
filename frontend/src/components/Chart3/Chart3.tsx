import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import './Chart3.css';

interface Chart3Props {
  data: Array<{ [key: string]: number | string }>;
  title: string;
  keys: Array<{ name: string; color: string }>;
}

const Chart3: React.FC<Chart3Props> = ({ data, title, keys }) => {
  return (
    <div className="chart3-container">
      <div className="chart3-header">
        <h3 className="chart3-title">{title}</h3>
        {/* <select className="chart3-dropdown">
          <option>Last 8 Months</option>
          <option>Last Year</option>
        </select> */}
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
          margin={{ top: 10, right: 10, left: -10}}
        >
          <CartesianGrid strokeDasharray="5 5" stroke="#eaeaea" vertical={false}/>
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip />
          {keys.map((key) => (
            <Bar
              key={key.name}
              dataKey={key.name}
              fill={key.color}
              barSize={20}
              animationEasing='ease-in-out'
              animationDuration={2000}
          />))}
        </BarChart>
      </ResponsiveContainer>  
    </div>
  );
};

export default Chart3;
