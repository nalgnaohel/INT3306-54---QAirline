package business

import (
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/config"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/aircraft"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/aircraft/repository"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
)

type AircraftBusiness struct {
	cfg          *config.Config
	aircraftRepo repository.AircraftRepository
}

func NewAircraftBusiness(cfg *config.Config, aircraftRepo repository.AircraftRepository) aircraft.AircraftBusiness {
	return &AircraftBusiness{
		cfg:          cfg,
		aircraftRepo: aircraftRepo,
	}
}

func (ab *AircraftBusiness) Create(aircraft *models.Aircraft) (*models.Aircraft, error) {
	newAircraft, err := ab.aircraftRepo.Create(aircraft)
	if err != nil {
		return nil, err
	}
	return newAircraft, nil
}

func (ab *AircraftBusiness) GetByAircraftID(aircraftID int) (*models.Aircraft, error) {
	aircraft, err := ab.aircraftRepo.GetByAircraftID(aircraftID)
	if err != nil {
		return nil, err
	}
	return aircraft, nil
}

func (ab *AircraftBusiness) Update(aircraft *models.Aircraft) (*models.Aircraft, error) {
	updatedAircraft, err := ab.aircraftRepo.Update(aircraft)
	if err != nil {
		return nil, err
	}
	return updatedAircraft, nil
}

func (ab *AircraftBusiness) Delete(aircraftID int) error {
	err := ab.aircraftRepo.Delete(aircraftID)
	if err != nil {
		return err
	}
	return nil
}

func (ab *AircraftBusiness) GetByAircraftModel(aircraftModel string) (*models.Aircraft, error) {
	aircraft, err := ab.aircraftRepo.GetByAircraftModel(aircraftModel)
	if err != nil {
		return nil, err
	}
	return aircraft, nil
}
