package server

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/requestid"
	authBiz "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/auth/business"
	authDelivery "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/auth/delivery/http"
	authRepo "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/auth/repository"
	flightBusiness "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/flight/business"
	flightDelivery "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/flight/delivery/http"
	flightRepository "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/flight/repository"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/middleware"
)

func (s *Server) MapHandlers(fib *fiber.App) error {

	//Init auth
	authRepository := authRepo.NewAuthRepo(s.dtb)
	authBusiness := authBiz.NewAuthBusiness(s.cfg, authRepository)
	authHandlers := authDelivery.NewAuthHandlers(authBusiness)

	//Init flight
	flightRepository := flightRepository.NewFlightRepo(s.dtb)
	flightBusiness := flightBusiness.NewFlightBusiness(s.cfg, flightRepository)
	flightHandlers := flightDelivery.NewFlightHandlers(flightBusiness)

	//Middleware init
	mw := middleware.NewMiddleware(authBusiness, *s.cfg, []string{"*"})

	//fiber default middleware
	fib.Use(requestid.New())
	fib.Use(limiter.New(limiter.Config{
		Max: 1000,
		LimitReached: func(c *fiber.Ctx) error {
			return c.Status(fiber.StatusTooManyRequests).JSON(&fiber.Map{
				"status":  "fail",
				"message": "You have requested too many in a single time-frame! Please wait another minute!",
			})
		},
	}))
	fib.Use(cors.New())

	api := fib.Group("/api")

	authGroup := api.Group("/auth")
	authDelivery.MapAuthRoutes(authGroup, mw, authHandlers, authBusiness, s.cfg)

	flightGroup := api.Group("/flights")
	flightDelivery.MapFlightRoutes(flightGroup, mw, flightHandlers, authBusiness, s.cfg)

	fib.Get("", func(ctx *fiber.Ctx) error {
		return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status":  "success",
			"message": "hello world",
		})
	})

	fib.Get("/hi", func(ctx *fiber.Ctx) error {

		return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status": "success",
			"data":   "hello from hi get",
		})
	})

	return nil
}
