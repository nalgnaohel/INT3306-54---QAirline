import React from 'react';
import './Chart2.css';

interface SourceData {
  name: string;
  value: number;
  colorClass: string;
}

interface Chart2Props {
  title: string;
  data: SourceData[];
}

const Chart2: React.FC<Chart2Props> = ({ title, data }) => {
  const totalUsers = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="chart-container">
      <h2 className="chart-title">{title}</h2>
      <div className="sources-grid">
        {data.map((source, index) => (
          <div key={index} className={`source-item ${source.colorClass}`}>
            <div className="source-name">{source.name}</div>
            <div className="source-value">{source.value.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart2;
