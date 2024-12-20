package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/aircraft"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/pkg/utils"
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

// GetByAircraftID - get aircraft by aircraftID
func (ah *aircraftHandler) GetByAircraftID() fiber.Handler {
	return func(c *fiber.Ctx) error {
		aircraftID := c.Params("aircraftID")

		aircraft, err := ah.aircraftBusiness.GetByAircraftID(aircraftID)
		if err != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"status": "Not Found",
				"error":  "Cannot find aircraft - " + err.Error(),
			})
		}

		return c.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status":   "Success",
			"aircraft": aircraft,
		})
	}
}

// Delete - delete aircraft by aircraftID
func (ah *aircraftHandler) Delete() fiber.Handler {
	return func(c *fiber.Ctx) error {
		aircraftID := c.Params("aircraftID")

		err := ah.aircraftBusiness.Delete(aircraftID)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"status": "Internal Server Error",
				"error":  "Cannot delete aircraft - " + err.Error(),
			})
		}

		return c.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status": "Success",
		})
	}
}

// Update - update aircraft by aircraftID
func (ah *aircraftHandler) Update() fiber.Handler {
	return func(c *fiber.Ctx) error {
		aircraftID := c.Params("aircraftID")
		aircraft := &models.Aircraft{}
		if err := c.BodyParser(aircraft); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"status": "Bad Request",
				"error":  "Cannot parse aircraft - " + err.Error(),
			})
		}

		aircraft = &models.Aircraft{}
		aircraft.AircraftID = aircraftID
		if err := c.BodyParser(aircraft); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"status": "Bad Request",
				"error":  "Cannot parse aircraft - " + err.Error(),
			})
		}

		updatedAircraft, err := ah.aircraftBusiness.Update(aircraft)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"status": "Internal Server Error",
				"error":  "Cannot update aircraft - " + err.Error(),
			})
		}

		return c.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status":   "Success",
			"aircraft": updatedAircraft,
		})
	}
}

// GetAll - get all aircraft
func (ah *aircraftHandler) GetAll() fiber.Handler {
	return func(c *fiber.Ctx) error {
		pagingQuery, err := utils.GetPaginationFromCtx(c)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"status": "Internal Server Error",
				"error":  "Query error - " + err.Error(),
			})
		}

		flights, err := ah.aircraftBusiness.GetAll(pagingQuery)
		if err != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"status": "Not Found",
				"error":  "Cannot find flights - " + err.Error(),
			})
		}

		return c.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status":  "Success",
			"flights": flights,
		})
	}
}
