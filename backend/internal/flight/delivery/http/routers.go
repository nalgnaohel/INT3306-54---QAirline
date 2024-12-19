package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/config"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/flight"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/middleware"
)

func MapFlightRoutes(flightRouter fiber.Router, mw *middleware.Middleware, handlers flight.Handlers, flightBusiness flight.FlightBusiness, cfg *config.Config) {
	flightRouter.Post("/flights", handlers.CreateFlight)
	flightRouter.Get("/flights/:flightID", handlers.GetFlightByID)
	// flight
	// flightRouter.Put("/flights/:flightID", handlers.UpdateFlight)
	// flightRouter.Delete("/flights/:flightID", handlers.DeleteFlight)
	flightRouter.Get("/flights", handlers.GetAllFlights)
}