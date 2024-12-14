import React, { useState } from "react";
import FlightDetails from "../../../components/FlightDetail/FlightDetails";
import PassengerList from "../../../components/PassengerList/PassengerList";
import SeatSelection from "../../../components/SeatSelection/SeatSelection";

const FlightProcedure: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div>
      {currentStep === 1 && <FlightDetails onContinue={goToNextStep} />}
      {currentStep === 2 && (
        <PassengerList onBack={goToPreviousStep} onContinue={goToNextStep} />
      )}
      {currentStep === 3 && (
        <SeatSelection onBack={goToPreviousStep} onContinue={goToNextStep} />
      )}
    </div>
  );
};

export default FlightProcedure;
