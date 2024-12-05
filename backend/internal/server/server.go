package server

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/config"
	"gorm.io/gorm"
)

// constants
const (
	ctxTimeout = 10
)

// Define the Server struct
type Server struct {
	fiber *fiber.App
	cfg   *config.Config
	dtb   *gorm.DB
}

// NewServer - creates a new server
func NewServer(cfg *config.Config, dtb *gorm.DB) *Server {
	return &Server{
		fiber: fiber.New(),
		cfg:   cfg,
		dtb:   dtb,
	}
}

// Start - starts the server
func (s *Server) Start() error {
	err := s.MapHandlers(s.fiber)
	if err != nil {
		return err
	}

	s.fiber.Server().ReadTimeout = time.Second * s.cfg.Server.ReadTimeout
	s.fiber.Server().WriteTimeout = time.Second * s.cfg.Server.WriteTimeout

	go func() {
		log.Printf("Server is listening on PORT: %s", s.cfg.Server.Port)

		if err := s.fiber.Listen("localhost:" + s.cfg.Server.Port); err != nil {
			log.Fatalf("Error starting Server: %e", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)

	<-quit

	ctx, shutdown := context.WithTimeout(context.Background(), ctxTimeout*time.Second)
	defer shutdown()

	log.Println("Server Exited OK")
	return s.fiber.Server().ShutdownWithContext(ctx)
}
