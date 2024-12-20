package business

import (
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/ticket"
	"github.com/pkg/errors"
)

type ticketUsecase struct {
	ticketRepo ticket.TicketRepository
}

// NewTicketUsecase creates a new ticket usecase
func NewTicketUsecase(ticketRepo ticket.TicketRepository) ticket.TicketBusi {
	return &ticketUsecase{
		ticketRepo: ticketRepo,
	}
}

// Create creates a new ticket
func (tu *ticketUsecase) Create(tickets models.Ticket) (models.Ticket, error) {
	createdTicket, err := tu.ticketRepo.Create(tickets)
	if err != nil {
		return models.Ticket{}, errors.Wrap(err, "ticketUsecase.Create")
	}
	return createdTicket, nil
}

// GetByID gets a ticket by ID
func (tu *ticketUsecase) GetByID(ticketID string) (*models.Ticket, error) {
	ticket, err := tu.ticketRepo.GetByID(ticketID)
	if err != nil {
		return nil, errors.Wrap(err, "ticketUsecase.GetByID")
	}
	return ticket, nil
}

// Delete deletes a ticket by ID
func (tu *ticketUsecase) Delete(ticketID string) error {
	err := tu.ticketRepo.Delete(ticketID)
	if err != nil {
		return errors.Wrap(err, "ticketUsecase.Delete")
	}
	return nil
}

// Update updates a ticket
func (tu *ticketUsecase) Update(ticket *models.Ticket) (*models.Ticket, error) {
    updatedTicket, err := tu.ticketRepo.Update(ticket)
    if err != nil {
        return nil, errors.Wrap(err, "ticketUsecase.Update")
    }
    return updatedTicket, nil
}


func (tu *ticketUsecase) UpdateSeat(ticketID string, seat string) error {
    err := tu.ticketRepo.UpdateSeat(ticketID, seat)
    if err != nil {
        return errors.Wrap(err, "ticketUsecase.UpdateSeat")
    }
    return nil
}

// GetAll gets all tickets
func (tu *ticketUsecase) GetAll() ([]*models.Ticket, error) {
	tickets, err := tu.ticketRepo.GetAll()
	if err != nil {
		return nil, errors.Wrap(err, "ticketUsecase.GetAll")
	}
	return tickets, nil
}

// Getbyemail gets tickets by user ID
func (tu *ticketUsecase) GetByEmail(email string) ([]*models.Ticket, error) {
	tickets, err := tu.ticketRepo.GetByEmail(email)
	if err != nil {
		return nil, errors.Wrap(err, "ticketUsecase.GetByUserID")
	}
	return tickets, nil
}

// GetByFlightID gets tickets by flight ID
func (tu *ticketUsecase) GetByFlightID(flightID string) ([]*models.Ticket, error) {
	tickets, err := tu.ticketRepo.GetByFlightID(flightID)
	if err != nil {
		return nil, errors.Wrap(err, "ticketUsecase.GetByFlightID")
	}
	return tickets, nil
}
