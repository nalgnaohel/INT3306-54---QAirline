package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/promo"
)

// Handlers is the struct that contains the promo business logic
type Handlers struct {
	PromoBusiness promo.PromoBusiness
}

// CreatePromo creates a new promo
func (h *Handlers) CreatePromo(c *fiber.Ctx) error {
	var promo models.Promo
	if err := c.BodyParser(&promo); err != nil {
		log.Error(err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse body"})
	}
	createdPromo, err := h.PromoBusiness.Create(promo)
	if err != nil {
		log.Error(err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Cannot create promo"})
	}
	return c.Status(fiber.StatusCreated).JSON(createdPromo)
}

// GetPromoByID gets a promo by ID
func (h *Handlers) GetPromoByID(c *fiber.Ctx) error {
	promoID := c.Params("promoID")
	promo, err := h.PromoBusiness.GetByID(promoID)
	if err != nil {
		log.Error(err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Cannot get promo"})
	}
	return c.Status(fiber.StatusOK).JSON(promo)
}

// DeletePromo deletes a promo by ID
func (h *Handlers) DeletePromo(c *fiber.Ctx) error {
	promoID := c.Params("promoID")
	err := h.PromoBusiness.Delete(promoID)
	if err != nil {
		log.Error(err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Cannot delete promo"})
	}
	return c.Status(fiber.StatusNoContent).JSON(nil)
}

// UpdatePromo updates a promo
func (h *Handlers) UpdatePromo(c *fiber.Ctx) error {
	promoID := c.Params("promoID")
	var promo models.Promo
	if err := c.BodyParser(&promo); err != nil {
		log.Error(err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse body"})
	}
	err := h.PromoBusiness.Update(promoID, promo)
	if err != nil {
		log.Error(err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Cannot update promo"})
	}
	return c.Status(fiber.StatusOK).JSON(nil)
}

// GetAllPromos gets all promos
func (h *Handlers) GetAllPromos(c *fiber.Ctx) error {
	promos, err := h.PromoBusiness.GetAll()
	if err != nil {
		log.Error(err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Cannot get promos"})
	}
	return c.Status(fiber.StatusOK).JSON(promos)
}

// NewHandlers creates a new promo handlers
func NewHandlers(promoBusiness promo.PromoBusiness) Handlers {
	return Handlers{
		PromoBusiness: promoBusiness,
	}
}



