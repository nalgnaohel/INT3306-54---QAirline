package ticket

import (
	"github.com/gofiber/fiber/v2"
)

type Handlers interface {
    CreateTicket(c *fiber.Ctx) error
    GetTicketByID(c *fiber.Ctx) error
    DeleteTicket(c *fiber.Ctx) error
    UpdateTicket(c *fiber.Ctx) error
}