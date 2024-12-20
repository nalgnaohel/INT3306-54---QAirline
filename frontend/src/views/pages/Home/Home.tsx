import React, { useState } from "react";
import TopNavBar from "../../../components/Navbar/TopNavBar";
import SearchBox from "../../../components/SearchBox/SearchBox";
import PopularFlights from "../../../components/PopularFlights/PopularFlights";
import FeaturedInfo from "../../../components/FeaturedInfo/FeaturedInfo";
import Footer from "../../../components/Footer/Footer";
import FlightResults from "../../../components/FlightResults/FlightResults";
import CruisePartners from "../../../components/CruisePartners/CruisePartners";
import FeedbackCarousel from "../../../components/FeedbackCarousel/FeedbackCarousel";
import "./Home.css";

import { Flight } from "../../../components/FlightResults/FlightResults";

const Home: React.FC = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [returnFlights, setReturnFlights] = useState<Flight[]>([]);
  const [passengerCounts, setPassengerCounts] = useState({
    adult: 1,
    child: 0,
    infant: 0,
  });
  const [tripType, setTripType] = useState("one-way");

  return (
    <div className="Home">
      <SearchBox
        setIsSearching={setIsSearching}
        setReturnFlights={setReturnFlights}
        setFilteredFlights={setFilteredFlights}
        setPassengerCounts={setPassengerCounts}
        setTripType={setTripType}
      />

      {isSearching ? (
        <FlightResults
          flights={filteredFlights}
          returnFlights={returnFlights}
          setIsSearching={setIsSearching}
          passengerCounts={passengerCounts}
          tripType={tripType}
        />
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
