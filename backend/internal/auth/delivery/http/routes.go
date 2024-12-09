package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/config"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/auth"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/middleware"
)

func MapAuthRoutes(authRouter fiber.Router, mw middleware.Middleware, handlers auth.Handlers, authBusiness auth.AuthBusiness, cfg config.Config) {
	authRouter.Post("/register", handlers.Register())
	authRouter.Post("/login", handlers.Login())
	authRouter.Use(mw.JWTAuthMiddleware(authBusiness, cfg))
	authRouter.Get("/:user_id", mw.CheckAdmin(), handlers.GetByID())
	authRouter.Put("/:user_id", mw.CheckAdmin(), handlers.Update())
	authRouter.Put("/change-password/:user_id", handlers.ChangePassword())
	authRouter.Delete("/:user_id", mw.CheckAdmin(), handlers.Delete())
}
