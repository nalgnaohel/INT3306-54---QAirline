package business

import (
	//"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"github.com/pkg/errors"

	"github.com/google/uuid"
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
func NewAuthBusiness(cfg *config.Config, authRepo auth.AuthRepository) auth.AuthBusiness {
	return &authBusiness{
		cfg:      cfg,
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

	log.Info("newUser.Password: ", newUser.Password)
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
	if err := user.PreRegister(); err != nil {
		return nil, err
	}

	updatedUser, err := auth.authRepo.Update(user)
	if err != nil {
		return nil, err
	}

	//Make sure that user's password is not exposed in API responses or logs
	updatedUser.SanitizePassword()
	return updatedUser, nil
}

// Delete deletes a user
func (auth *authBusiness) Delete(userID uuid.UUID) error {
	return auth.authRepo.Delete(userID)
}

// GetByEmail gets a user by email
func (auth *authBusiness) GetByEmail(email string) (*models.User, error) {
	return auth.authRepo.GetByEmail(email)
}

// Get user by their ID
func (auth *authBusiness) GetByID(userID uuid.UUID) (*models.User, error) {
	return auth.authRepo.GetByID(userID)
}

// ChangePassword changes a user's password
func (auth *authBusiness) ChangePassword(userID uuid.UUID, oldPassword string, newPassword string) (*models.User, error) {
	user, err := auth.authRepo.GetByID(userID)
	if err != nil {
		return nil, errors.Wrap(err, "error getting user")
	}

	if err := user.PreRegister(); err != nil {
		return nil, errors.Wrap(err, "error changing password")
	}

	err = user.ComparePassword(oldPassword)
	if err != nil {
		return nil, errors.Wrap(err, "error changing password - old password is incorrect")
	}

	//Change to newpass and hash
	user.Password = newPassword
	if err := user.HashPassword(); err != nil {
		return nil, errors.Wrap(err, "error changing password - hashing new password")
	}

	updatedUser, err := auth.authRepo.Update(user)
	if err != nil {
		return nil, errors.Wrap(err, "error changing password - updating user")
	}

	//Make sure that user's password is not exposed in API responses or logs
	updatedUser.SanitizePassword()
	return updatedUser, nil
}
