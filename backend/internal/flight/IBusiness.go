package flight

import (
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/pkg/utils"
)

type FlightBusiness interface {
	Create(flight *models.Flight) (*models.Flight, error)
	GetByFlightID(flightID string) (*models.Flight, error)
	//GetAll() ([]*models.Flight, error)
	Update(flight *models.Flight) (*models.Flight, error)
	Delete(flightID string) error
	GetFlightOneWay(departure string, arrival string, departureDate string) ([]*models.Flight, error)
	//GetFlightRoundTrip(departure string, arrival string, departureDate string, returnDate string) ([]*models.Flight, error)
	GetAll(query *utils.PagingQuery) (*models.FlightList, error)
	GetStatusFlightsStatistics() ([]models.FlightStatus, error)
	GetFlightByEmail(email string) ([]*models.Flight, error)
}
