import React from 'react';
import './Chart2.css';

interface SourceData {
  name: string;
  value: number;
  colorClass: string;
}

interface Chart2Props {
  title: string;
  percentageChange: number;
  data: SourceData[];
}

const Chart2: React.FC<Chart2Props> = ({ title, percentageChange, data }) => {
  const totalUsers = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="chart-container">
      <h2 className="chart-title">{title}</h2>
      <div className="chart-total">
        <span className="total-number">{(totalUsers / 1000).toFixed(1)}K</span>
        <span className={`percentage-change ${percentageChange < 0 ? 'negative' : 'positive'}`}>
          {percentageChange}% {percentageChange < 0 ? '🔻' : '🔺'}
        </span>
      </div>
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
