import React from "react";
import { Link } from "react-router-dom";
import "./NewsSection.css";
import features from "../news.json";

const NewsSection: React.FC = () => {
  const { featuredData, newsData } = features;

  return (
    <>
      <div className="featured-section">
        <div className="featured-section-header">
          <h2 className="featured-section-title">Thông tin nổi bật</h2>
        </div>
        <div className="featured-section-grid">
          {featuredData.map((feature) => (
            <div key={feature.id} className="featured-card">
              <Link
                to={`/feature/${feature.id}`}
                className="featured-card-link"
              >
                <img
                  src={require(`../../assets/images/${feature.image}`)}
                  alt={feature.title}
                  className="featured-card-image"
                />
                <div className="featured-card-title">{feature.title}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="news-section">
        <h2 className="news-title">Tin tức mới</h2>
        <div className="news-list">
          {newsData.map((news) => (
            <div key={news.id} className="news-item">
              <h3 className="news-item-title">{news.title}</h3>
              <p className="news-item-description">{news.content}</p>
              <Link to={`/news/${news.id}`} className="news-item-link">
                Xem chi tiết
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewsSection;
