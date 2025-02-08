package server

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/requestid"
	aircraftBusiness "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/aircraft/business"
	aircraftDelivery "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/aircraft/delivery/http"
	aircraftRepository "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/aircraft/repository"
	airportBusiness "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/airport/business"
	airportDelivery "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/airport/delivery/http"
	airportRepository "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/airport/repository"
	authBiz "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/auth/business"
	authDelivery "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/auth/delivery/http"
	authRepo "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/auth/repository"
	flightBusiness "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/flight/business"
	flightDelivery "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/flight/delivery/http"
	flightRepository "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/flight/repository"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/middleware"
	ticketBiz "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/ticket/business"
	ticketDelivery "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/ticket/delivery/http"
	ticketRepo "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/ticket/repository"
)

func (s *Server) MapHandlers(fib *fiber.App) error {
	// Init auth
	authRepository := authRepo.NewAuthRepo(s.dtb)
	authBusiness := authBiz.NewAuthBusiness(s.cfg, authRepository)
	authHandlers := authDelivery.NewAuthHandlers(authBusiness)

	//Middleware init
	mw := middleware.NewMiddleware(authBusiness, *s.cfg, []string{"*"})

	// Init ticket
	ticketRepository := ticketRepo.NewTicketRepo(s.dtb)
	ticketBusiness := ticketBiz.NewTicketUsecase(ticketRepository)
	ticketHandlers := ticketDelivery.NewTicketHandlers(ticketBusiness)

	// Init flight
	flightRepository := flightRepository.NewFlightRepo(s.dtb)
	flightBusiness := flightBusiness.NewFlightBusiness(s.cfg, flightRepository)
	flightHandlers := flightDelivery.NewFlightHandlers(flightBusiness)

	//Init aircraft
	aircraftRepository := aircraftRepository.NewAircraftRepo(s.dtb)
	aircraftBusiness := aircraftBusiness.NewAircraftBusiness(s.cfg, aircraftRepository)
	aircraftHandlers := aircraftDelivery.NewAircraftHandlers(aircraftBusiness)

	//Init airport
	airportRepository := airportRepository.NewAirportRepo(s.dtb)
	airportBusiness := airportBusiness.NewAirportBusiness(s.cfg, airportRepository)
	airportHandlers := airportDelivery.NewAirportHandlers(airportBusiness)

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

	// Setup API groups
	api := fib.Group("/api")

	authGroup := api.Group("/auth")
	authDelivery.MapAuthRoutes(authGroup, mw, authHandlers, authBusiness, s.cfg)

	flightGroup := api.Group("/flight")
	flightDelivery.MapFlightRoutes(flightGroup, mw, flightHandlers, authBusiness, s.cfg)

	aircraftGroup := api.Group("/aircraft")
	aircraftDelivery.MapAircraftRoutes(aircraftGroup, mw, aircraftHandlers, authBusiness, s.cfg)

	airportGroup := api.Group("/airport")
	airportDelivery.MapAirportRoutes(airportGroup, mw, airportHandlers, authBusiness, s.cfg)

	ticketGroup := api.Group("/ticket")
	ticketDelivery.MapTicketRoutes(ticketGroup, mw, ticketHandlers, authBusiness, s.cfg)
	fib.Get("", func(ctx *fiber.Ctx) error {
		return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status":  "success",
			"message": "hello world",
		})
	})

	fib.Get("/hi", func(ctx *fiber.Ctx) error {
		// span, _ := opentracing.StartSpanFromContext(ctx.Context(), "num.end")
		// defer span.Finish()

		return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status": "success",
			"data":   "hello from hi get",
		})
	})

	return nil
}
