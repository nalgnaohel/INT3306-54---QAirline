package ticket

import (
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
)

// TicketRepository is the interface that defines the methods that must be implemented by the ticket repository
type TicketRepository interface {
	Create(tickets models.Ticket) (models.Ticket, error)
	GetByID(ticketID string) (*models.Ticket, error)
	Delete(ticketID string) error
	Update(ticket *models.Ticket) (*models.Ticket, error)
	GetAll() ([]*models.Ticket, error)
	GetByEmail(email string) ([]*models.Ticket, error)
	GetByFlightID(flightID string) ([]*models.Ticket, error)
	UpdateSeat(ticketID string, seat string) error
}

