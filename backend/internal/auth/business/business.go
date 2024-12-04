package business

import (
	"context"
	"net/http"

	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/auth"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/pkg/httpErrors"
)

type authBusiness struct {
	authRepo auth.AuthRepository
}

// NewAuthBusiness - creates a new auth business
func NewAuthBusiness(authRepo auth.AuthRepository) auth.AuthBusiness {
	return &authBusiness{
		authRepo: authRepo,
	}
}

// Register - creates a new user
func (auth *authBusiness) Register(ctx context.Context, user *models.User) (*models.User, httpErrors.HTTPError) {

	//Kiem tra xem da co user nao co email nay chua
	existsUser, err := auth.authRepo.GetByEmail(user.Email)
	if existsUser != nil || err == nil {
		return nil, httpErrors.NewHTTPError(http.StatusBadRequest, "Email already exists")
	}

	if err := user.PrepareCreate(); err != nil {
		return nil, httpErrors.NewHTTPError(http.StatusBadRequest, "Error preparing user")
	}

	newUser, err = auth.authRepo.Register(user)
	if err != nil {
		return nil, httpErrors.NewHTTPError(http.StatusInternalServerError, "Error creating user")
	}

	newUser.SanitizePassword()

	return user, nil
}

// GetByEmail gets a user by email
func (auth *authBusiness) GetByEmail(email string) (*models.User, error) {
	return auth.authRepo.GetByEmail(email)
}

// Login logs in a user
