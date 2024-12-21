import React from "react";
import FeaturedInfo from "../../../components/FeaturedInfo/FeaturedInfo";
import NewsSection from "../../../components/NewsSection/NewsSection";
import "./PageNews.css";
import TopNavBar from "../../../components/Navbar/TopNavBar";
import Footer from "../../../components/Footer/Footer";
import UserNavBar from "../../../components/UserNavbar/UserNavbar"
import { UserProvider } from "../../../components/UserContent/UserContext";

const PageNews: React.FC = () => {
  return (
    <>
      <UserProvider>
        {localStorage.getItem('currentUser') === null ? <TopNavBar /> : <UserNavBar />}
      </UserProvider>
      <div className="main-page">
        <NewsSection />
      </div>
      <Footer />
    </>
  );
};

export default PageNews;
