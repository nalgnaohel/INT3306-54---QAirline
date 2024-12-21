import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NewsSection.css";
import features from "../news.json";
import { useLocation } from "react-router-dom";

const NewsSection: React.FC = () => {
  const { featuredData, newsData } = features;
  const location = useLocation();

  // Dùng useEffect để cuộn lên đầu trang khi component được render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // State để quản lý việc mở rộng nội dung chi tiết
  const [expandedNews, setExpandedNews] = useState<number | null>(null);

  const toggleNewsDetail = (id: number) => {
    if (expandedNews === id) {
      setExpandedNews(null); // Đóng nếu đã mở
    } else {
      setExpandedNews(id); // Mở chi tiết
    }
  };

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
              <p className="news-item-description">
                {news.content.slice(0, 100)}...
              </p>
              <button
                onClick={() => toggleNewsDetail(Number(news.id))}
                className="news-item-link"
              >
                {expandedNews === Number(news.id)
                  ? "Ẩn chi tiết"
                  : "Xem chi tiết"}
              </button>
              {expandedNews === Number(news.id) && (
                <div className="news-item-full-content">
                  <p>{news.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewsSection;
