package airport

import (
	"github.com/gofiber/fiber/v2"
)

type AirportHandlers interface {
	Create() fiber.Handler
	Update() fiber.Handler
	Delete() fiber.Handler
	GetAirportByIataCode() fiber.Handler
	GetAll() fiber.Handler
}
