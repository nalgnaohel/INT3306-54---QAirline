package promo

import (
	"github.com/gofiber/fiber/v2"
)

type Handlers interface {
	CreatePromo(c *fiber.Ctx) error
	GetPromoByID(c *fiber.Ctx) error
	DeletePromo(c *fiber.Ctx) error
	UpdatePromo(c *fiber.Ctx) error
	GetAllPromos(c *fiber.Ctx) error
}