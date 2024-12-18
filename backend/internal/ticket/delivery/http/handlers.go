package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"github.com/google/uuid"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/ticket"
)

type ticketHandler struct {
	ticketBusi ticket.TicketBusi 
}

// CreateTicket creates a new ticket
func (th *ticketHandler) CreateTicket(c *fiber.Ctx) error {
    ticket := &models.Ticket{
        TicketID: uuid.New().String(),
    }

    if err := c.BodyParser(ticket); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "status": "Bad Request",
            "error":  "Cannot parse - " + err.Error(),
        })
    }

    createdTicket, err := th.ticketBusi.Create(ticket) 
    if err != nil {
        log.Error("ticketHandler.CreateTicket %e", err)
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "status": "Internal Server Error",
            "error":  "Cannot create ticket - " + err.Error(),
        })
    }

    return c.Status(fiber.StatusCreated).JSON(createdTicket)
}

// GetTicketByID gets a ticket by ID
func (th *ticketHandler) GetTicketByID(c *fiber.Ctx) error {
	ticketID := c.Params("ticketID")

	ticket, err := th.ticketBusi.GetByID(ticketID) 
	if err != nil {
		log.Error("ticketHandler.GetTicketByID %e", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status": "Internal Server Error",
			"error":  "Cannot get ticket - " + err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(ticket)
}

// NewTicketHandlers creates new ticket handlers
func NewTicketHandlers(ticketBusi ticket.TicketBusi) ticket.Handlers {
	return &ticketHandler{
		ticketBusi: ticketBusi, // Thay đổi tham chiếu ở đây
	}
}
