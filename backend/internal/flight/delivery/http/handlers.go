package http

import (
	"log"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/flight"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/pkg/utils"
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
		flightID := c.Params("flightID")
		flightID = strings.Replace(flightID, "%20", " ", -1)
		log.Println("handler-----", flightID)
		if flightID == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"status": "Bad Request",
				"error":  "Flight ID is required",
			})
		}

		flight := &models.Flight{}
		flight.FlightID = flightID

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
		departure := c.Query("departure")
		arrival := c.Query("arrival")
		departureDate := c.Query("departureDate")
		flights, err := fh.flightBusiness.GetFlightOneWay(departure, arrival, departureDate)
		//log.Println(departure, arrival, departureDate)
		if err != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"status": "Not Found",
				"error":  "Cannot find flight - " + err.Error(),
			})
		}

		return c.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status":        "Success",
			"flights":       flights,
			"departureDate": departureDate,
			"departure":     departure,
			"arrival":       arrival,
		})
	}
}

// GetAll - get all flights
func (fh *flightHandler) GetAll() fiber.Handler {
	return func(c *fiber.Ctx) error {
		pagingQuery, err := utils.GetPaginationFromCtx(c)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"status": "Internal Server Error",
				"error":  "Query error - " + err.Error(),
			})
		}

		flights, err := fh.flightBusiness.GetAll(pagingQuery)
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

// GetCancelledFlights - get all cancelled flights
func (fh *flightHandler) GetStatusFlightsStatistics() fiber.Handler {
	return func(c *fiber.Ctx) error {
		var flightStatus []models.FlightStatus
		flightStatus, err := fh.flightBusiness.GetStatusFlightsStatistics()

		if err != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"status": "Internal Server Error",
				"error":  "flights status - " + err.Error(),
			})
		}

		return c.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status":        "Success",
			"flightsStatus": flightStatus,
		})
	}
}
