package server

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/requestid"
	authBiz "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/auth/business"
	authDelivery "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/auth/delivery/http"
	authRepo "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/auth/repository"
	ticketBiz "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/ticket/business"
	ticketDelivery "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/ticket/delivery/http"
	ticketRepo "github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/ticket/repository"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/middleware"
)

func (s *Server) MapHandlers(fib *fiber.App) error {
	// Init auth
	authRepository := authRepo.NewAuthRepo(s.dtb)
	authBusiness := authBiz.NewAuthBusiness(s.cfg, authRepository)
	authHandlers := authDelivery.NewAuthHandlers(authBusiness)
	authMiddleware := middleware.NewMiddleware(authBusiness, *s.cfg, []string{"*"})

	// Init ticket
	ticketRepository := ticketRepo.NewTicketRepo(s.dtb)
	ticketBusiness := ticketBiz.NewTicketUsecase(ticketRepository)
	ticketHandlers := ticketDelivery.NewTicketHandlers(ticketBusiness)

	// Fiber default middleware
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
	authDelivery.MapAuthRoutes(authGroup, authMiddleware, authHandlers, authBusiness, s.cfg)

	// Setup Ticket routes
	ticketGroup := api.Group("/tickets")
	ticketDelivery.SetupRouter(ticketGroup, authMiddleware, ticketHandlers, ticketBusiness, s.cfg)

	// Test route
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
