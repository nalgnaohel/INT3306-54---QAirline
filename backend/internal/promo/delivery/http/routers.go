package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/config"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/middleware"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/promo"
)

// MapPromoRoutes maps the promo routes to the handlers
func MapPromoRoutes(promoRouter fiber.Router, mw *middleware.Middleware, handlers promo.Handlers, promoBusiness promo.PromoBusiness, cfg *config.Config) {
	promoRouter.Post("/", handlers.CreatePromo)
	promoRouter.Get("/:promoID", handlers.GetPromoByID)
	promoRouter.Delete("/:promoID", handlers.DeletePromo)
	promoRouter.Put("/:promoID", handlers.UpdatePromo)
	promoRouter.Get("/all", handlers.GetAllPromos)
}