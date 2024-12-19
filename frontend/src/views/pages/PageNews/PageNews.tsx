import React from "react";
import FeaturedInfo from "../../../components/FeaturedInfo/FeaturedInfo";
import NewsSection from "../../../components/NewsSection/NewsSection";
import "./PageNews.css";
import TopNavBar from "../../../components/Navbar/TopNavBar";
import Footer from "../../../components/Footer/Footer";

const PageNews: React.FC = () => {
  return (
    <>
      <TopNavBar />
      <div className="main-page">
        <NewsSection />
      </div>
      <Footer />
    </>
  );
};

export default PageNews;
