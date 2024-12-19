package flight

import (
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
)

// FlightRepository interface
type FlightRepository interface {
	Create(flight *models.Flight) (*models.Flight, error)
	GetByFlightID(flightID string) (*models.Flight, error)
	GetAll() ([]*models.Flight, error)
	Update(flight *models.Flight) (*models.Flight, error)
	Delete(flightID string) error
}
