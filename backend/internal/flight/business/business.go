package business

import (
	config "github.com/nalgnaohel/INT3306-54---QAirline/backend/config"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/flight"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/pkg/utils"
)

type flightBusiness struct {
	cfg        *config.Config
	flightRepo flight.FlightRepository
}

func NewFlightBusiness(cfg *config.Config, flightRepo flight.FlightRepository) flight.FlightBusiness {
	return &flightBusiness{
		cfg:        cfg,
		flightRepo: flightRepo,
	}
}

func (fb *flightBusiness) Create(flight *models.Flight) (*models.Flight, error) {
	newFlight, err := fb.flightRepo.Create(flight)
	if err != nil {
		return nil, err
	}
	return newFlight, nil
}

func (fb *flightBusiness) GetByFlightID(flightID string) (*models.Flight, error) {
	flight, err := fb.flightRepo.GetByFlightID(flightID)
	if err != nil {
		return nil, err
	}
	return flight, nil
}

func (fb *flightBusiness) Update(flight *models.Flight) (*models.Flight, error) {
	updatedFlight, err := fb.flightRepo.Update(flight)
	if err != nil {
		return nil, err
	}
	return updatedFlight, nil
}

// Delete flight
func (fb *flightBusiness) Delete(flightID string) error {
	err := fb.flightRepo.Delete(flightID)
	if err != nil {
		return err
	}
	return nil
}

// Get flight one way
func (fb *flightBusiness) GetFlightOneWay(departure string, arrival string, departureDate string) ([]*models.Flight, error) {
	flights, err := fb.flightRepo.GetFlightOneWay(departure, arrival, departureDate)
	if err != nil {
		return nil, err
	}
	return flights, nil
}

// Get flight round trip
// func (fb *flightBusiness) GetFlightRoundTrip(departure string, arrival string, departureDate string, returnDate string) ([]*models.Flight, error) {
// 	flights, err := fb.flightRepo.GetFlightRoundTrip(departure, arrival, departureDate, returnDate)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return flights, nil
// }

func (fb *flightBusiness) GetAll(query *utils.PagingQuery) (*models.FlightList, error) {
	flights, err := fb.flightRepo.GetAll(query)
	if err != nil {
		return nil, err
	}
	return flights, nil
}

func (fb *flightBusiness) GetStatusFlightsStatistics() ([]models.FlightStatus, error) {
	flights, err := fb.flightRepo.GetStatusFlightsStatistics()
	if err != nil {
		return nil, err
	}
	return flights, nil
}

func (fb *flightBusiness) GetFlightByEmail(email string) ([]*models.Flight, error) {
	flights, err := fb.flightRepo.GetFlightByEmail(email)
	if err != nil {
		return nil, err
	}
	return flights, nil
}
