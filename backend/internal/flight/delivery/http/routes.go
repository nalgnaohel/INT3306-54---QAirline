package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/config"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/auth"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/middleware"
)

func MapFlightRoutes(flightRouter fiber.Router, mw *middleware.Middleware, handlers *flightHandler, authBusiness auth.AuthBusiness, cfg *config.Config) {
	flightRouter.Get("/onewayflight", handlers.GetFlightOneWay())
	//flightRouter.Get("/roundtripflight", handlers.GetFlightRoundTrip())
	flightRouter.Use(mw.JWTAuthMiddleware(authBusiness, cfg)) // middleware for jwt - khi fetch can them header Authorization
	flightRouter.Post("/", handlers.Create())
	flightRouter.Get("/flight/:flightID", handlers.GetByFlightID())
	flightRouter.Delete("/:flightID", handlers.Delete())
	flightRouter.Put("/:flightID", handlers.Update())
	flightRouter.Get("/all", handlers.GetAll())
	flightRouter.Get("/statistics/flightstatus", handlers.GetStatusFlightsStatistics())
}
