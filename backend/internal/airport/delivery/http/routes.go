package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/config"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/auth"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/middleware"
)

func MapAirportRoutes(airportRouter fiber.Router, mw *middleware.Middleware, handlers *airportHandler, authBusiness auth.AuthBusiness, cfg *config.Config) {
	airportRouter.Use(mw.JWTAuthMiddleware(authBusiness, cfg)) // middleware for jwt - khi fetch can them header Authorization
	airportRouter.Post("/", handlers.Create())
	airportRouter.Get("/airport/:iataCode", handlers.GetByIataCode())
	airportRouter.Delete("/:iataCode", handlers.Delete())
	airportRouter.Put("/:iataCode", handlers.Update())
	airportRouter.Get("/all", handlers.GetAll())
}
