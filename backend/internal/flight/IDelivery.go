package flight

import (
	"github.com/gofiber/fiber/v2"
)

type Handlers interface {
	CreateFlight(c *fiber.Ctx) error
	GetFlightByID(c *fiber.Ctx) error
	GetAllFlights(c *fiber.Ctx) error
	UpdateFlight(c *fiber.Ctx) error
	DeleteFlight(c *fiber.Ctx) error
}