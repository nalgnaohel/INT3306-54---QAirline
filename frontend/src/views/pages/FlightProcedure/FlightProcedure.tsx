import React, { useState } from "react";
import FlightDetails from "../../../components/FlightDetail/FlightDetails";
import PassengerList from "../../../components/PassengerList/PassengerList";
import SeatSelection from "../../../components/SeatSelection/SeatSelection";
import ConfirmationPage from "../../../components/ConfirmationPage/ConfirmationPage";
import Footer from "../../../components/Footer/Footer";

// Mock data for testing
const mockFlightDetails = {
  flightNumber: "QA123",
  departure: "New York",
  destination: "London",
  date: "2023-10-10",
  time: "10:00 AM",
};

const mockPassenger = {
  name: "John Doe",
  type: "A12345678",
};

const mockSelectedSeats = "12A";

const FlightProcedure: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <div>
        {currentStep === 1 && <FlightDetails onContinue={goToNextStep} />}
        {currentStep === 2 && (
          <PassengerList onBack={goToPreviousStep} onContinue={goToNextStep} />
        )}
        {currentStep === 3 && (
          <SeatSelection onBack={goToPreviousStep} onContinue={goToNextStep} />
        )}
        {currentStep === 4 && (
          <ConfirmationPage
            onBack={goToPreviousStep}
            onConfirm={goToNextStep}
            flightDetails={mockFlightDetails}
            passenger={mockPassenger}
            selectedSeat={mockSelectedSeats}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default FlightProcedure;
