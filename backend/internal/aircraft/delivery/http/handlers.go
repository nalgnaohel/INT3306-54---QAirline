package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/aircraft"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
)

type aircraftHandler struct {
	aircraftBusiness aircraft.AircraftBusiness
}

func NewAircraftHandlers(aircraftBusiness aircraft.AircraftBusiness) *aircraftHandler {
	return &aircraftHandler{
		aircraftBusiness: aircraftBusiness,
	}
}

// Create - create new aircraft
func (ah *aircraftHandler) Create() fiber.Handler {
	return func(c *fiber.Ctx) error {
		aircraft := &models.Aircraft{}
		if err := c.BodyParser(aircraft); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"status": "Bad Request",
				"error":  "Cannot parse aircraft - " + err.Error(),
			})
		}

		newAircraft, err := ah.aircraftBusiness.Create(aircraft)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"status": "Internal Server Error",
				"error":  "Cannot create aircraft - " + err.Error(),
			})
		}

		return c.Status(fiber.StatusCreated).JSON(&fiber.Map{
			"status":   "Success",
			"aircraft": newAircraft,
		})
	}
}
