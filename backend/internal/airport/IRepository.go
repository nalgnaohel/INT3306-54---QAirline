package airport

import (
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
)

type AirportRepository interface {
	GetAirportByIataCode(iataCode string) (*models.Airport, error)
	Create(*models.Airport) (*models.Airport, error)
	Update(*models.Airport) (*models.Airport, error)
	Delete(iataCode string) error
	GetAll() ([]models.Airport, error)
}
