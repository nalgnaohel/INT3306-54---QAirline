package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/flight"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
)

type flightHandler struct {
	flightBusiness flight.FlightBusiness
}

func NewFlightHandlers(flightBusiness flight.FlightBusiness) *flightHandler {
	return &flightHandler{
		flightBusiness: flightBusiness,
	}
}

func (fh *flightHandler) Create() fiber.Handler {
	return func(c *fiber.Ctx) error {
		flight := &models.Flight{}
		if err := c.BodyParser(flight); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"status": "Bad Request",
				"error":  "Cannot parse flight - " + err.Error(),
			})
		}

		newFlight, err := fh.flightBusiness.Create(flight)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"status": "Internal Server Error",
				"error":  "Cannot create flight - " + err.Error(),
			})
		}

		return c.Status(fiber.StatusCreated).JSON(&fiber.Map{
			"status": "Success",
			"flight": newFlight,
		})
	}
}

// GetByFlightID - get flight by flight id
func (fh *flightHandler) GetByFlightID() fiber.Handler {
	return func(c *fiber.Ctx) error {
		flightID := c.Params("flightID")
		flight, err := fh.flightBusiness.GetByFlightID(flightID)
		if err != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"status": "Not Found",
				"error":  "Cannot find flight - " + err.Error(),
			})
		}

		return c.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status": "Success",
			"flight": flight,
		})
	}
}

// Update - update flight
func (fh *flightHandler) Update() fiber.Handler {
	return func(c *fiber.Ctx) error {
		flight := &models.Flight{}
		if err := c.BodyParser(flight); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"status": "Bad Request",
				"error":  "Cannot parse flight - " + err.Error(),
			})
		}

		updatedFlight, err := fh.flightBusiness.Update(flight)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"status": "Internal Server Error",
				"error":  "Cannot update flight - " + err.Error(),
			})
		}

		return c.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status": "Success",
			"flight": updatedFlight,
		})
	}
}

// Delete - delete flight
func (fh *flightHandler) Delete() fiber.Handler {
	return func(c *fiber.Ctx) error {
		flightID := c.Params("flightID")
		err := fh.flightBusiness.Delete(flightID)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"status": "Internal Server Error",
				"error":  "Cannot delete flight - " + err.Error(),
			})
		}

		return c.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status":  "Success",
			"message": "Flight deleted",
		})
	}
}

// GetFlightOneWay - get flight one way
func (fh *flightHandler) GetFlightOneWay() fiber.Handler {
	return func(c *fiber.Ctx) error {
		departure := c.Params("departure")
		arrival := c.Params("arrival")
		departureTime := c.Params("departureTime")
		flights, err := fh.flightBusiness.GetFlightOneWay(departure, arrival, departureTime)
		if err != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"status": "Not Found",
				"error":  "Cannot find flight - " + err.Error(),
			})
		}

		return c.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status":  "Success",
			"flights": flights,
		})
	}
}
