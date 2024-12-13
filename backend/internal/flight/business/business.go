package business

import (
	config "github.com/nalgnaohel/INT3306-54---QAirline/backend/config"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/flight"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
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

// func (fb *flightBusiness) GetAll() ([]*models.Flight, error) {
// 	flights, err := fb.flightRepo.GetAll()
// 	if err != nil {
// 		return nil, err
// 	}
// 	return flights, nil
// }