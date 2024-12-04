package server

import (

	"github.com/gofiber/fiber/v2"
)

func (s *Server) MapHandlers(fib *fiber.App) error {
	fib.Get("", func(ctx *fiber.Ctx) error {
		return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status": "success",
			"data":   "hello world",
		})
	})
	return nil
}