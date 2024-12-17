import React, { useState, useEffect } from "react";
import "./FeedbackCarousel.css";

const feedbacks = [
  {
    content:
      "Lần đầu chị đặt vé bay đi nước ngoài bên em và cảm thấy vô cùng hài lòng! Chị rất cảm ơn bên em tư vấn cho chị chuyến bay, giờ bay đẹp, thời gian nối chuyến hợp lý, không bị mệt. Chắc chắn chị sẽ đặt vé bên em nhiều nhiều.",
    author: "Chị Giang",
  },
  {
    content:
      "Dịch vụ rất tốt! Nhân viên tư vấn nhiệt tình, hỗ trợ mình từ lúc đặt vé đến khi hoàn thành chuyến bay. Cảm ơn rất nhiều!",
    author: "Anh Quang Anh",
  },
  {
    content:
      "Mình rất hài lòng với dịch vụ ở đây. Mọi thứ đều rất chuyên nghiệp, mình sẽ giới thiệu cho bạn bè.",
    author: "Cô Minh Hòa",
  },
  {
    content:
      "Mình rất hài lòng với dịch vụ ở đây. Mọi thứ đều rất chuyên nghiệp, mình sẽ giới thiệu cho bạn bè.",
    author: "Cô Minh Hòa",
  },
  {
    content:
      "Mình rất hài lòng với dịch vụ ở đây. Mọi thứ đều rất chuyên nghiệp, mình sẽ giới thiệu cho bạn bè.",
    author: "Cô Minh Hòa",
  },
  {
    content:
      "Mình rất hài lòng với dịch vụ ở đây. Mọi thứ đều rất chuyên nghiệp, mình sẽ giới thiệu cho bạn bè.",
    author: "Cô Minh Hòa",
  },
];

const FeedbackCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbacks.length);
    }, 15000); // 15 giây

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="feedback-carousel">
      <div className="title-feedback">
        <div className="title">
          <h2>
            Đánh giá từ những <br />
            người đã trải nghiệm
          </h2>
          <div className="img-feed">
            <img
              srcSet="https://mixivivu.com/_next/image?url=%2Fheading-border.png&w=96&q=75"
              alt="anh"
            />
          </div>
        </div>
        <div className="lab-feed">
          <label htmlFor="">
            Khách hàng chia sẻ về những kỷ niệm tuyệt vời trên chuyến du lịch
            với chúng tôi.
          </label>
        </div>
      </div>
      <div className="feedback-content">
        <p className="quote">“{feedbacks[currentIndex].content}”</p>
        <p className="author">{feedbacks[currentIndex].author}</p>
      </div>
      <div className="feedback-navigation">
        {feedbacks.map((feedback, index) => (
          <button
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          >
            {feedback.author}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeedbackCarousel;
