package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/config"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/auth"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/middleware"
)

func MapAircraftRoutes(aircraftRouter fiber.Router, mw *middleware.Middleware, handlers *aircraftHandler, authBusiness auth.AuthBusiness, cfg *config.Config) {
	aircraftRouter.Use(mw.JWTAuthMiddleware(authBusiness, cfg)) // middleware for jwt - khi fetch can them header Authorization
	aircraftRouter.Post("/", handlers.Create())
	aircraftRouter.Get("/aircraft/:aircraftID", handlers.GetByAircraftID())
	aircraftRouter.Delete("/:aircraftID", handlers.Delete())
	aircraftRouter.Put("/:aircraftID", handlers.Update())
	aircraftRouter.Get("/all", handlers.GetAll())
}
