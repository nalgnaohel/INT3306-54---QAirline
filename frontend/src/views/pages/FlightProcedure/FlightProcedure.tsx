import React, { useState } from "react";
import FlightDetails from "../../../components/FlightDetail/FlightDetails";
import PassengerList from "../../../components/PassengerList/PassengerList";
import SeatSelection from "../../../components/SeatSelection/SeatSelection";
import ConfirmationPage from "../../../components/ConfirmationPage/ConfirmationPage";
import Footer from "../../../components/Footer/Footer";
import TopNavBar from "../../../components/Navbar/TopNavBar";
import { useLocation, useNavigate } from "react-router-dom";

const FlightProcedure: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [seatNumber, setSeatNumber] = useState("");
  const location = useLocation();
  const {
    flight_id,
    departure,
    arrival,
    departure_time,
    arrival_time,
    seat_number,
    price,
    email,
    bookingCode,
  } = location.state || {};

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <TopNavBar />
      <div>
        {currentStep === 1 && <FlightDetails onContinue={goToNextStep} />}
        {currentStep === 2 && (
          <PassengerList
            onBack={goToPreviousStep}
            onContinue={goToNextStep}
            email={email}
            bookingCode={bookingCode}
          />
        )}
        {currentStep === 3 && (
          <SeatSelection
            onBack={goToPreviousStep}
            onContinue={goToNextStep}
            // flightDetails={{
            //   flight_id,
            //   departure,
            //   arrival,
            //   departure_time,
            //   arrival_time,
            //   seat_number,
            //   price,
            // }}
            setSeatNumber={setSeatNumber}
            bookingCode={bookingCode}
          />
        )}
        {currentStep === 4 && (
          <ConfirmationPage
            onBack={goToPreviousStep}
            flightDetails={{
              ticket_id: bookingCode,
              email,
              flight_id,
              departure,
              arrival,
              departure_time,
              arrival_time,
              seat_number,
              price,
            }}
            seatNumber={seatNumber}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default FlightProcedure;
