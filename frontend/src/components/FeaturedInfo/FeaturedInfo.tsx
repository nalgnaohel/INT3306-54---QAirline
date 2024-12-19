import React from "react";
import "./FeaturedInfo.css";

const FeaturedInfo: React.FC = () => {
  return (
    <div className="featured-info">
      <h2 className="featured-title">Thông tin nổi bật</h2>
      <div className="info-grid">
        <div className="info-card">
          <img
            src={require("../../assets/images/sinhnhat.jpg")}
            alt="Giảm giá lên đến 30%"
            className="info-card-image"
          />
          <div className="info-card-text">Giảm giá lên đến 30%</div>
        </div>
        <div className="info-card">
          <img
            src={require("../../assets/images/doan.jpg")}
            alt="Ẩm thực hạng thương gia"
            className="info-card-image"
          />
          <div className="info-card-text">Ẩm thực hạng thương gia</div>
        </div>
        <div className="info-card">
          <img
            src={require("../../assets/images/hanhli.jpg")}
            alt="Trải nghiệm khách sạn 5 sao"
            className="info-card-image"
          />
          <div className="info-card-text">Trải nghiệm khách sạn 5 sao</div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedInfo;
