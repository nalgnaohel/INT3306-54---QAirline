package aircraft

import "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"

type AircraftRepository interface {
	Create(aircraft *models.Aircraft) (*models.Aircraft, error)
	GetByAircraftID(aircraftID string) (*models.Aircraft, error)
	Update(aircraft *models.Aircraft) (*models.Aircraft, error)
	Delete(aircraftID *models.Aircraft) error
	GetAll() ([]*models.AircraftList, error)
}
