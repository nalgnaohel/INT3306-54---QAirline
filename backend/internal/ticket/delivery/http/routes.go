package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/config"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/auth"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/middleware"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/ticket"
)

// SetupRouter will set up all routes for ticket handling
func MapTicketRoutes(ticketRouter fiber.Router, mw *middleware.Middleware, handlers ticket.Handlers, authBusiness auth.AuthBusiness, cfg *config.Config) {
	// API route để tạo vé mới
	ticketRouter.Post("/", handlers.CreateTicket)

	// API route để lấy vé theo ID
	ticketRouter.Get("/ticket/:ticketID", handlers.GetTicketByID)

	// API route để update vé
	ticketRouter.Put("/:ticketID", handlers.UpdateTicket)

	// API route để xóa vé
	ticketRouter.Delete("/:ticketID", handlers.DeleteTicket)

	// API route để update seat của vé
	ticketRouter.Put("/:ticketID/seat", handlers.UpdateSeat)

	// API route để lấy tất cả vé
	ticketRouter.Get("/all", handlers.GetAllTickets)

	// Các API khác như update, delete, get all tickets, get by user ID, get by flight ID
	// ticketRouter.Put("/tickets/:ticketID", handlers.UpdateTicket)
	// ticketRouter.Delete("/tickets/:ticketID", handlers.DeleteTicket)
}
