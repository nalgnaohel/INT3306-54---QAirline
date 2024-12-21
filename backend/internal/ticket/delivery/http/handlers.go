package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	gonanoid "github.com/matoous/go-nanoid/v2"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/ticket"
)

type ticketHandler struct {
	ticketBusi ticket.TicketBusi 
}


// CreateTicket creates a new ticket
func (th *ticketHandler) CreateTicket(c *fiber.Ctx) error {
	ticket := &models.Ticket{}

	// In ra raw body để kiểm tra dữ liệu
    body := c.Body()
    log.Infof("Raw body: %s", string(body))

	
	if err := c.BodyParser(ticket); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status": "Bad Request",
			"error":  "Cannot parse - " + err.Error(),
		})
	}

	// Tạo TicketID ngắn gọn hơn bằng NanoID, ví dụ độ dài 10 ký tự
    ticketID, err := gonanoid.Generate("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 10)
    if err != nil {
        log.Error("Failed to generate TicketID: ", err)
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "status": "Internal Server Error",
            "error":  "Cannot generate TicketID",
        })
    }
    ticket.TicketID = ticketID
	createdTicket, err := th.ticketBusi.Create(*ticket)
	if err != nil {
		log.Error("ticketHandler.CreateTicket %e", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status": "Internal Server Error",
			"error":  "Cannot create ticket - " + err.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(createdTicket)
}

func (th *ticketHandler) UpdateSeat(c *fiber.Ctx) error {
    ticketID := c.Params("ticketID")

    var requestBody struct {
        Seat string `json:"seat"`
    }

    if err := c.BodyParser(&requestBody); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "status": "Bad Request",
            "error":  "Cannot parse request body - " + err.Error(),
        })
    }

    err := th.ticketBusi.UpdateSeat(ticketID, requestBody.Seat)
    if err != nil {
        log.Error("ticketHandler.UpdateSeat %e", err)
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "status": "Internal Server Error",
            "error":  "Cannot update seat - " + err.Error(),
        })
    }

    return c.Status(fiber.StatusOK).JSON(fiber.Map{
        "status": "Success",
        "message": "Seat updated successfully",
    })
}





// GetTicketByID gets a ticket by ID
func (th *ticketHandler) GetTicketByID(c *fiber.Ctx) error {
	ticketID := c.Params("ticketID")

	ticket, err := th.ticketBusi.GetByID(ticketID) 
	if err != nil {
		log.Error("ticketHandler.GetTicketByID %e", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status": "Internal Server Error",
			"error":  "Cannot get ticket - " + err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(ticket)
}

// DeleteTicket deletes a ticket by ID
func (th *ticketHandler) DeleteTicket(c *fiber.Ctx) error {
	ticketID := c.Params("ticketID")

	err := th.ticketBusi.Delete(ticketID)
	if err != nil {
		log.Error("ticketHandler.DeleteTicket %e", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status": "Internal Server Error",
			"error":  "Cannot delete ticket - " + err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status": "Success",
		"message": "Ticket deleted successfully",
	})
}

// UpdateTicket updates a ticket
func (th *ticketHandler) UpdateTicket(c *fiber.Ctx) error {
    ticketID := c.Params("ticketID")
    ticket := &models.Ticket{}

    // Parse body để nhận thông tin ticket mới (có thể là chỉ seat_number hoặc tất cả)
    if err := c.BodyParser(ticket); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "status": "Bad Request",
            "error":  "Cannot parse - " + err.Error(),
        })
    }

    // Gán lại ticketID để đảm bảo update đúng ticket
    ticket.TicketID = ticketID

    // Gọi business logic để update ticket trong database
    updatedTicket, err := th.ticketBusi.Update(ticket)
    if err != nil {
        log.Error("ticketHandler.UpdateTicket %e", err)
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "status": "Internal Server Error",
            "error":  "Cannot update ticket - " + err.Error(),
        })
    }

    return c.Status(fiber.StatusOK).JSON(updatedTicket)
}

// GetAllTickets gets all tickets
func (th *ticketHandler) GetAllTickets(c *fiber.Ctx) error {
    tickets, err := th.ticketBusi.GetAll()
    if err != nil {
        log.Error("ticketHandler.GetAllTickets %e", err)
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "status": "Internal Server Error",
            "error":  "Cannot get all tickets - " + err.Error(),
        })
    }

    return c.Status(fiber.StatusOK).JSON(tickets)
}


// NewTicketHandlers creates new ticket handlers
func NewTicketHandlers(ticketBusi ticket.TicketBusi) ticket.Handlers {
	return &ticketHandler{
		ticketBusi: ticketBusi, // Thay đổi tham chiếu ở đây
	}
}
