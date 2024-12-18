import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './Chart3.css';

interface SessionData {
  date: string;
  MindBrew: number;
  BrainBoosters: number;
}

interface Chart3Props {
  title: string;
  data: SessionData[];
}

const Chart3: React.FC<Chart3Props> = ({ title, data }) => {
  return (
    <div className="chart3-container">
      <h2 className="chart3-title">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          barCategoryGap="30%" /* Tạo khoảng cách giữa các cột */
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Hiệu ứng xuất hiện của các cột */}
          <Bar
            dataKey="MindBrew"
            fill="#4285f4"
            name="MindBrew"
            animationDuration={1500} /* Thời gian hiệu ứng 1.5 giây */
          />
          <Bar
            dataKey="BrainBoosters"
            fill="#f4b400"
            name="BrainBoosters"
            animationDuration={1500}
            animationBegin={200} /* Bắt đầu muộn hơn 0.2 giây */
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart3;
