package business

import (
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/config"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/airport"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
)

type airportBusiness struct {
	cfg         *config.Config
	airportRepo airport.AirportRepository
}

func NewAirportBusiness(cfg *config.Config, airportRepo airport.AirportRepository) airport.AirportBusiness {
	return &airportBusiness{
		cfg:         cfg,
		airportRepo: airportRepo,
	}
}

func (ab *airportBusiness) Create(airport *models.Airport) (*models.Airport, error) {
	newAirport, err := ab.airportRepo.Create(airport)
	if err != nil {
		return nil, err
	}
	return newAirport, nil
}

func (ab *airportBusiness) GetAirportByIataCode(iataCode string) (*models.Airport, error) {
	airport, err := ab.airportRepo.GetAirportByIataCode(iataCode)
	if err != nil {
		return nil, err
	}
	return airport, nil
}

func (ab *airportBusiness) Update(airport *models.Airport) (*models.Airport, error) {
	updatedAirport, err := ab.airportRepo.Update(airport)
	if err != nil {
		return nil, err
	}
	return updatedAirport, nil
}

func (ab *airportBusiness) Delete(iataCode string) error {
	err := ab.airportRepo.Delete(iataCode)
	if err != nil {
		return err
	}
	return nil
}

func (ab *airportBusiness) GetAll() ([]models.Airport, error) {
	airports, err := ab.airportRepo.GetAll()
	if err != nil {
		return nil, err
	}
	return airports, nil
}
