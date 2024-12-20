package aircraft

import (
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/pkg/utils"
)

type AircraftBusiness interface {
	Create(aircraft *models.Aircraft) (*models.Aircraft, error)
	GetByAircraftID(aircraftID string) (*models.Aircraft, error)
	Update(aircraft *models.Aircraft) (*models.Aircraft, error)
	Delete(aircraftID string) error
	GetByAircraftModel(aircraftModel string) (*models.Aircraft, error)
	GetAll(query *utils.PagingQuery) (*models.AircraftList, error)
}
