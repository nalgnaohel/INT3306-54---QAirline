package flight

import (
	"github.com/gofiber/fiber/v2"
)

type Handlers interface {
	Create() fiber.Handler
	Update() fiber.Handler
	Delete() fiber.Handler
	GetByFlightID() fiber.Handler
	GetFlightOneWay() fiber.Handler
	GetAll() fiber.Handler
	GetStatusFlightsStatistics() fiber.Handler
}
