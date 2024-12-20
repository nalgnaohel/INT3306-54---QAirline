package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/airport"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
)

type airportHandler struct {
	airportBusiness airport.AirportBusiness
}

func NewAirportHandlers(airportBusiness airport.AirportBusiness) *airportHandler {
	return &airportHandler{
		airportBusiness: airportBusiness,
	}
}

func (ah *airportHandler) Create() fiber.Handler {
	return func(c *fiber.Ctx) error {
		airport := &models.Airport{}
		if err := c.BodyParser(airport); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"status": "Bad Request",
				"error":  "Cannot parse airport - " + err.Error(),
			})
		}

		newAirport, err := ah.airportBusiness.Create(airport)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"status": "Internal Server Error",
				"error":  "Cannot create airport - " + err.Error(),
			})
		}

		return c.Status(fiber.StatusCreated).JSON(&fiber.Map{
			"status":  "Success",
			"airport": newAirport,
		})
	}
}

func (ah *airportHandler) GetByIataCode() fiber.Handler {
	return func(c *fiber.Ctx) error {
		airportIATACode := c.Params("iataCode")
		airport, err := ah.airportBusiness.GetAirportByIataCode(airportIATACode)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"status": "Internal Server Error",
				"error":  "Cannot get airport by IATA code - " + err.Error(),
			})
		}

		return c.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status":  "Success",
			"airport": airport,
		})
	}
}

func (ah *airportHandler) Delete() fiber.Handler {
	return func(c *fiber.Ctx) error {
		airportIATACode := c.Params("iataCode")
		err := ah.airportBusiness.Delete(airportIATACode)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"status": "Internal Server Error",
				"error":  "Cannot delete airport - " + err.Error(),
			})
		}

		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"status":  "Success",
			"message": "Airport deleted successfully",
		})
	}
}

func (ah *airportHandler) Update() fiber.Handler {
	return func(c *fiber.Ctx) error {
		airportIATACode := c.Params("iataCode")
		if airportIATACode == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"status": "Bad Request",
				"error":  "IATA code is required",
			})
		}

		airport := &models.Airport{}
		airport.IATACode = airportIATACode

		if err := c.BodyParser(airport); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"status": "Bad Request",
				"error":  "Cannot parse airport - " + err.Error(),
			})
		}

		updatedAirport, err := ah.airportBusiness.Update(airport)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"status": "Internal Server Error",
				"error":  "Cannot update airport - " + err.Error(),
			})
		}

		return c.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status":  "Success",
			"airport": updatedAirport,
		})
	}
}

func (ah *airportHandler) GetAll() fiber.Handler {
	return func(c *fiber.Ctx) error {
		airports, err := ah.airportBusiness.GetAll()
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"status": "Internal Server Error",
				"error":  "Cannot get all airports - " + err.Error(),
			})
		}

		return c.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status":   "Success",
			"airports": airports,
		})
	}
}
