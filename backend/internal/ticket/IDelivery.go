package ticket

import (
	"github.com/gofiber/fiber/v2"
)

// TicketRepository is the interface that defines the methods that must be implemented by the ticket repository
type Handlers interface {
    CreateTicket(c *fiber.Ctx) error
    GetTicketByID(c *fiber.Ctx) error
}