package middleware

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/config"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/auth"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/pkg/utils"
)

// JWTAuthMiddleware - authentication JWT using cookie session/ Auth header
func (m *Middleware) JWTAuthMiddleware(authBusiness auth.AuthBusiness, cfg config.Config) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		authHeader := ctx.GetReqHeaders()["Authorization"][0]
		log.Printf("Auth header: %v", ctx.GetReqHeaders()["Authorization"])

		if authHeader != "" {
			headerParts := strings.Split(authHeader, " ")
			if len(headerParts) != 2 {
				log.Panic("Auth middleware - Invalid auth header")
				return ctx.Status(http.StatusUnauthorized).JSON(fiber.Map{
					"status":  http.StatusUnauthorized,
					"message": "Unauthorized",
				})
			}

			tokenString := headerParts[1]

			if err := m.validateJWTToken(tokenString, authBusiness, ctx, cfg); err != nil {
				log.Panic("Auth middleware validate JWT Token - Invalid auth header")
				return ctx.Status(http.StatusUnauthorized).JSON(fiber.Map{
					"status":  http.StatusUnauthorized,
					"message": "Unauthorized",
				})
			}

			return ctx.Next()
		}
		return ctx.Status(http.StatusUnauthorized).JSON(fiber.Map{
			"status":  http.StatusUnauthorized,
			"message": "Unauthorized",
		})

	}
}

func (m *Middleware) validateJWTToken(tokenString string, authBusiness auth.AuthBusiness, ctx *fiber.Ctx, cfg config.Config) error {
	if tokenString == "" {
		return errors.New("Empty token")
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signin method %v", token.Header["alg"])
		}
		secret := []byte(cfg.Server.JwtSecretKey)
		return secret, nil
	})

	if err != nil {
		return err
	}

	if !token.Valid {
		return errors.New("Invalid token")
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		userID, ok := claims["id"].(string)
		if !ok {
			return errors.New("Invalid JWT Claims")
		}

		userUUID, err := uuid.Parse(userID)
		if err != nil {
			return err
		}

		user, err := authBusiness.GetByID(userUUID)
		if err != nil {
			return err
		}

		ctx.Locals("user", user)

		c := context.WithValue(ctx.Context(), utils.UserCtxKey{}, user)	
		ctx.SetUserContext(c)
		
	}
	return nil
}

// check whether this user is allowed to do some action
func (m *Middleware) CheckAdmin() fiber.Handler {
	return func(ctx *fiber.Ctx) error {

		//check if the user is an admin
		user := ctx.Locals("user").(*models.User)
		if user.Type != "admin" {
			return ctx.Status(http.StatusUnauthorized).JSON(fiber.Map{
				"status":  http.StatusUnauthorized,
				"message": "Unauthorized",
			})
		}
		return ctx.Next()
	}
}
