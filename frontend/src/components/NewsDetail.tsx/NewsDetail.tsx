import React from "react";
import { useParams } from "react-router-dom";

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Sample data - Replace this with an API call if needed
  const newsData = [
    {
      id: "1",
      title: "Ưu đãi tháng này",
      content: "Chi tiết về ưu đãi đặc biệt khi đặt phòng trước 31/12/2024.",
    },
    {
      id: "2",
      title: "Hướng dẫn du lịch",
      content: "Chi tiết các địa điểm nổi tiếng cùng dịch vụ cao cấp.",
    },
    {
      id: "3",
      title: "Tin tức nội bộ",
      content: "Chi tiết về khách hàng thứ 1 triệu của chúng tôi!",
    },
  ];

  const newsItem = newsData.find((news) => news.id === id);

  if (!newsItem) {
    return <div>Không tìm thấy tin tức.</div>;
  }

  return (
    <div>
      <h1>{newsItem.title}</h1>
      <p>{newsItem.content}</p>
    </div>
  );
};

export default NewsDetail;
