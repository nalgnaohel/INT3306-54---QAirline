import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import './Chart1.css';

interface Chart1Props {
  data: { month: string; ticketsSold: number }[];
  totalTickets: number;
}

const Chart1: React.FC<Chart1Props> = ({ data, totalTickets }) => {
  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">Ticket Sales</h3>
        {/* <select className="chart-dropdown">
          <option>Last 6 Months</option>
          <option>Last Year</option>
        </select> */}
      </div>
      <div className="chart-total-tickets">
        <div className="chart-total-number">{totalTickets.toLocaleString('en-US')}</div>
        <div className="chart-sub-title">Tickets Sold</div>
      </div>
      <ResponsiveContainer width={410} height={200}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffc107" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ffc107" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="5 5" stroke="#eaeaea" vertical={false}/>
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
          <Area
            type="monotone"
            dataKey="ticketsSold"
            stroke="#ffc107"
            fill="url(#colorTickets)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart1;
