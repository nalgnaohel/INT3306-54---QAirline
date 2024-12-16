import React from "react";
import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { SiZalando } from "react-icons/si";
import { AiFillInstagram } from "react-icons/ai";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-sections">
        <div className="footer-section">
          <h3>Về QAirline</h3>
          <p>Giá trị cốt lõi</p>
          <p>Phát triển bền vững</p>
          <p>Tin tức</p>
          <p>Khuyến mại</p>
        </div>
        <div className="footer-section">
          <h3>Chính sách</h3>
          <p>Điều khoản & điều kiện</p>
          <p>Điều lệ vận chuyển</p>
          <p>Bảo mật thông tin</p>
        </div>
        <div className="footer-section">
          <h3>Hỗ trợ</h3>
          <p>Đánh giá dịch vụ</p>
          <p>Trung tâm trợ giúp</p>
          <p>Liên hệ</p>
        </div>
        <div className="footer-section">
          <h3>Dịch vụ</h3>
          <p>Thông tin về các chuyến bay</p>
          <p>Vé máy bay</p>
        </div>
      </div>

      {/* Kết nối với chúng tôi */}
      <div className="connect-us">
        <h2>Kết nối với chúng tôi</h2>
        <div className="social-icons">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a href="https://zalo.me" target="_blank" rel="noopener noreferrer">
            <SiZalando />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
