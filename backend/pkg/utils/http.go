package utils

import (
	"context"
	"errors"

	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
)

type UserCtxKey struct{}

// GetUserFromCtx Get user from context
func GetUserFromCtx(ctx context.Context) (*models.User, error) {
	user, ok := ctx.Value(UserCtxKey{}).(*models.User)
	if !ok {
		return nil, errors.New("User not found in context")
	}

	return user, nil
}