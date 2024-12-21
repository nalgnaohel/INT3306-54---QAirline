package airport

import (
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
)

type AirportBusiness interface {
	Create(airport *models.Airport) (*models.Airport, error)
	GetAirportByIataCode(iataCode string) (*models.Airport, error)
	Update(airport *models.Airport) (*models.Airport, error)
	Delete(iataCode string) error
	GetAll() ([]models.Airport, error)
}
