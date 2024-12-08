package utils

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
)

// JWTCustomClaims - custom claims for jwt
type JWTCustomClaims struct {
	Email string `json:"email"`
	ID    string `json:"id"`
	Type  string `json:"type"`
	jwt.RegisteredClaims
}

// GenerateJWTToken - generates a jwt token
func GenerateJWTToken(user *models.User, secret string) (string, error) {
	//Create claims
	claims := JWTCustomClaims{
		Email: user.Email,
		ID:    user.UserID.String(),
		Type:  user.Type,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24))},
	}

	//Create token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	//Sign token
	tokenString, err := token.SignedString([]byte(secret))

	if err != nil {
		return "", err
	}

	return tokenString, nil
}
