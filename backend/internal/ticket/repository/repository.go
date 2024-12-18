package repository

import (
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/ticket"
	"gorm.io/gorm"
)

type ticketRepo struct {
	db *gorm.DB
}

// NewTicketRepository creates a new ticket repository
func NewTicketRepo(db *gorm.DB) ticket.TicketRepository {
	return &ticketRepo{
		db: db,
	}
}

// DB Create new ticket
func (repo *ticketRepo) Create(ticket *models.Ticket) (*models.Ticket, error) {
	err := repo.db.Create(&ticket).Error
	if err != nil {
		return nil, err
	}
	return ticket, nil
}


func (repo *ticketRepo) GetByID(ticketID string) (*models.Ticket, error) {
	ticket := &models.Ticket{}
	err := repo.db.Where("ticket_id = ?", ticketID).First(ticket).Error
	if err != nil {
		return nil, err
	}
	return ticket, nil
}


// DB Delete ticket by ID
func (repo *ticketRepo) Delete(ticketID string) error {
	result := repo.db.Where("ticket_id = ?", ticketID).Delete(&models.Ticket{})
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

// DB Update ticket
func (repo *ticketRepo) Update(ticket *models.Ticket) (*models.Ticket, error) {
	err := repo.db.Where("ticket_id = ?", ticket.TicketID).Updates(ticket).Error
	if err != nil {
		return nil, err
	}
	return ticket, nil
}

// DB Get all tickets
func (repo *ticketRepo) GetAll() ([]*models.Ticket, error) {
	var tickets []*models.Ticket
	err := repo.db.Find(&tickets).Error
	if err != nil {
		return nil, err
	}
	return tickets, nil
}

// DB Get tickets by user ID
func (repo *ticketRepo) GetByUserID(userID string) ([]*models.Ticket, error) {
	var tickets []*models.Ticket
	err := repo.db.Where("user_id = ?", userID).Find(&tickets).Error
	if err != nil {
		return nil, err
	}
	return tickets, nil
}


// DB Get tickets by flight ID
func (repo *ticketRepo) GetByFlightID(flightID string) ([]*models.Ticket, error) {
	var tickets []*models.Ticket
	err := repo.db.Where("flight_id = ?", flightID).Find(&tickets).Error
	if err != nil {
		return nil, err
	}
	return tickets, nil
}

// DB Check if ticket exists
func (repo *ticketRepo) Exists(ticketID string) (bool, error) {
	var count int64
	err := repo.db.Model(&models.Ticket{}).Where("ticket_id = ?", ticketID).Count(&count).Error
	if err != nil {
		return false, err
	}
	return count > 0, nil
}
