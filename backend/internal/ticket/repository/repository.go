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

// DB Create a new ticket
func (repo *ticketRepo) Create(tickets models.Ticket) (models.Ticket, error) {
	err := repo.db.Create(&tickets).Error
	if err != nil {
		return models.Ticket{}, err
	}
	return tickets, nil
}

//update seat of ticket
func (repo *ticketRepo) UpdateSeat(ticketID string, seat string) error {
	result := repo.db.Model(&models.Ticket{}).Where("ticket_id = ?", ticketID).Update("seat_number", seat)
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
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
    // Sử dụng `Updates` để chỉ update `seat_number` và giữ lại các thông tin khác
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

// DB Get tickets by email
func (repo *ticketRepo) GetByEmail(email string) ([]*models.Ticket, error) {
	var tickets []*models.Ticket
	err := repo.db.Where("email = ?", email).Find(&tickets).Error
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

