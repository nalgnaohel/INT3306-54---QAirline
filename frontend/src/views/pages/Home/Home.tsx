import React, { useState } from "react";
import SearchBox from "../../../components/SearchBox";
import PopularFlights from "../../../components/PopularFlights";
import FeaturedInfo from "../../../components/FeaturedInfo";
import Footer from "../../../components/Footer";
import FlightResults from "../../../components/FlightResults";
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
        </>
      )}

      <Footer />
    </div>
  );
};

export default Home;
