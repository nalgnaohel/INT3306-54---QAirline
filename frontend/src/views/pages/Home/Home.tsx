import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import SearchBox from "../../../components/SearchBox";
import PopularFlights from "../../../components/PopularFlights";
import FeaturedInfo from "../../../components/FeaturedInfo";
import Footer from "../../../components/Footer";
import FlightResults from "../../../components/FlightResults";
import CruisePartners from "../../../components/CruisePartners";
import FeedbackCarousel from "../../../components/FeedbackCarousel";
import "./Home.css";

import { Flight } from "../../../components/FlightResults";

const Home: React.FC = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);

  return (
    <div className="Home">
      <SearchBox
        setIsSearching={setIsSearching}
        setFilteredFlights={setFilteredFlights}
      />

      {isSearching ? (
        <FlightResults flights={filteredFlights} />
      ) : (
        <>
          <PopularFlights />
          <FeaturedInfo />
          <FeedbackCarousel />
          <CruisePartners />
        </>
      )}

      <Footer />
    </div>
  );
};

export default Home;
