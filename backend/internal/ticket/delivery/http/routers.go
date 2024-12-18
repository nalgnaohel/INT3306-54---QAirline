package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/ticket"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/config"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/middleware"
)

// SetupRouter will set up all routes for ticket handling
func SetupRouter(ticketRouter fiber.Router, mw *middleware.Middleware, handlers ticket.Handlers, authBusiness ticket.TicketBusi, cfg *config.Config) {
	// API route để tạo vé mới
	ticketRouter.Post("/tickets", handlers.CreateTicket)

	// API route để lấy vé theo ID
	ticketRouter.Get("/tickets/:ticketID", handlers.GetTicketByID)

	// Các API khác như update, delete
	// ticketRouter.Put("/tickets/:ticketID", handlers.UpdateTicket)
	// ticketRouter.Delete("/tickets/:ticketID", handlers.DeleteTicket)
}
