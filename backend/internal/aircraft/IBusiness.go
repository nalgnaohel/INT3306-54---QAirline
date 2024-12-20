package aircraft

import "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"

type AircraftBusiness interface {
	Create(aircraft *models.Aircraft) (*models.Aircraft, error)
	GetByAircraftID(aircraftID int) (*models.Aircraft, error)
	Update(aircraft *models.Aircraft) (*models.Aircraft, error)
	Delete(aircraftID int) error
	GetByAircraftModel(aircraftModel string) (*models.Aircraft, error)
	//GetAll() (*models.AircraftList, error)
}