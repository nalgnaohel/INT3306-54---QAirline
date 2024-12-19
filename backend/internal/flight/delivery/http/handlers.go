package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"github.com/google/uuid"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/flight"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
)

type flightHandler struct {
	flightBusi flight.FlightBusiness
}

// NewFlightHandler creates a new flight handler
func NewFlightHandler(flightBusi flight.FlightBusiness) *flightHandler {
	return &flightHandler{
		flightBusi: flightBusi,
	}
}

// CreateFlight creates a new flight
func (fh *flightHandler) CreateFlight(c *fiber.Ctx) error {
	flight := &models.Flight{
		FlightID: uuid.New().String(),
	}

	if err := c.BodyParser(flight); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status": "Bad Request",
			"error":  "Cannot parse - " + err.Error(),
		})
	}

	createdFlight, err := fh.flightBusi.Create(flight)
	if err != nil {
		log.Error("flightHandler.CreateFlight %e", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status": "Internal Server Error",
			"error":  "Cannot create flight - " + err.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(createdFlight)
}

// GetFlightByID gets a flight by ID
func (fh *flightHandler) GetFlightByID(c *fiber.Ctx) error {
	flightID := c.Params("flightID")

	flight, err := fh.flightBusi.GetByFlightID(flightID)
	if err != nil {
		log.Error("flightHandler.GetFlightByID %e", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status": "Internal Server Error",
			"error":  "Cannot get flight - " + err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(flight)
}

// UpdateFlight updates a flight
func (fh *flightHandler) UpdateFlight(c *fiber.Ctx) error {
	flight := &models.Flight{
		FlightID: c.Params("flightID"),
	}

	if err := c.BodyParser(flight); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status": "Bad Request",
			"error":  "Cannot parse - " + err.Error(),
		})
	}

	updatedFlight, err := fh.flightBusi.Update(flight)
	if err != nil {
		log.Error("flightHandler.UpdateFlight %e", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status": "Internal Server Error",
			"error":  "Cannot update flight - " + err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(updatedFlight)
}

//DeleteFlight deletes a flight by ID
func (fh *flightHandler) DeleteFlight(c *fiber.Ctx) error {
	flightID := c.Params("flightID")

	err := fh.flightBusi.Delete(flightID)
	if err != nil {
		log.Error("flightHandler.DeleteFlight %e", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status": "Internal Server Error",
			"error":  "Cannot delete flight - " + err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status": "success",
		"message": "Flight deleted",
	})
}

// GetAllFlights gets all flights
func (fh *flightHandler) GetAllFlights(c *fiber.Ctx) error {
	flights, err := fh.flightBusi.GetAll()
	if err != nil {
		log.Error("flightHandler.GetAllFlights %e", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status": "Internal Server Error",
			"error":  "Cannot get flights - " + err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(flights)
}

// NewFlightHandlers creates new flight handlers
func NewFlightHandlers(flightBusi flight.FlightBusiness) flight.Handlers {
	return &flightHandler{
		flightBusi: flightBusi,
	}
}


