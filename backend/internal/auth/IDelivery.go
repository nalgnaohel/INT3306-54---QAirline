package auth

import (
	"github.com/gofiber/fiber/v2"
)

type Handlers interface {
	Register() fiber.Handler
	Login() fiber.Handler
	Logout() fiber.Handler
	Update() fiber.Handler
	Delete() fiber.Handler
	GetByID() fiber.Handler
	GetByEmail() fiber.Handler
	ChangePassword() fiber.Handler
}
