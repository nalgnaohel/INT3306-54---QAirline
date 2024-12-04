package business

import (
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/config"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/auth"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/pkg/utils"
)

type authBusiness struct {
	cfg      *config.Config
	authRepo auth.AuthRepository
}

// NewAuthBusiness - creates a new auth business
func NewAuthBusiness(authRepo auth.AuthRepository) auth.AuthBusiness {
	return &authBusiness{
		authRepo: authRepo,
	}
}

// Register - creates a new user
func (auth *authBusiness) Register(user *models.User) (*models.TokenedUser, error) {
	//Kiem tra xem da co user nao co email nay chua
	existsUser, err := auth.authRepo.GetByEmail(user.Email)
	if existsUser != nil || err == nil {
		return nil, err
	}

	if err := user.PreRegister(); err != nil {
		return nil, err
	}

	newUser, err := auth.authRepo.Register(user)
	if err != nil {
		return nil, err
	}

	//Make sure that user's password is not exposed in API responses or logs
	newUser.SanitizePassword()

	token, err := utils.GenerateJWTToken(newUser, auth.cfg.Server.JwtSecretKey)

	if err != nil {
		return nil, err
	}

	newTokenedUser := &models.TokenedUser{
		User:  newUser,
		Token: token,
	}

	return newTokenedUser, nil
}

// Login logs in a user
func (auth *authBusiness) Login(email string, password string) (*models.TokenedUser, error) {

	foundUser, err := auth.authRepo.GetByEmail(email)

	if err != nil {
		return nil, err
	}

	err = foundUser.ComparePassword(password)
	if err != nil {
		return nil, err
	}

	//Make sure that user's password is not exposed in API responses or logs
	foundUser.SanitizePassword()

	token, err := utils.GenerateJWTToken(foundUser, auth.cfg.Server.JwtSecretKey)
	if err != nil {
		return nil, err
	}
	user := &models.TokenedUser{
		User:  foundUser,
		Token: token,
	}

	return user, nil
}

// Update updates a user
func (auth *authBusiness) Update(user *models.User) (*models.User, error) {
	return auth.authRepo.Update(user)
}

// GetByEmail gets a user by email
func (auth *authBusiness) GetByEmail(email string) (*models.User, error) {
	return auth.authRepo.GetByEmail(email)
}
