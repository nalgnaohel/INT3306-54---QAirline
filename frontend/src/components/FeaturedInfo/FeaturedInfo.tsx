import React from "react";
import { Link } from "react-router-dom";
import "./FeaturedInfo.css";
import features from "../news.json";

const FeaturedInfo: React.FC = () => {
  const { featuredData, newsData } = features;
  return (
    <div className="featured-info">
      <div className="featured-header">
        <h2 className="featured-title">Thông tin nổi bật</h2>
        <Link to="/news" className="more-button">
          Thêm
        </Link>
      </div>
      <div className="info-grid">
        {featuredData.map((feature) => (
          <div key={feature.id} className="info-card">
            <Link to={`/news`} className="info-card-link">
              <img
                src={require(`../../assets/images/${feature.image}`)}
                alt={feature.title}
                className="info-card-image"
              />
              <div className="info-card-text">{feature.title}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedInfo;
