package business

import (
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/config"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/aircraft"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/pkg/utils"
)

type AircraftBusiness struct {
	cfg          *config.Config
	aircraftRepo aircraft.AircraftRepository
}

func NewAircraftBusiness(cfg *config.Config, aircraftRepo aircraft.AircraftRepository) aircraft.AircraftBusiness {
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

func (ab *AircraftBusiness) GetByAircraftID(aircraftID string) (*models.Aircraft, error) {
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

func (ab *AircraftBusiness) Delete(aircraftID string) error {
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

func (ab *AircraftBusiness) GetAll(query *utils.PagingQuery) (*models.AircraftList, error) {
	aircrafts, err := ab.aircraftRepo.GetAll(query)
	if err != nil {
		return nil, err
	}
	return aircrafts, nil
}
