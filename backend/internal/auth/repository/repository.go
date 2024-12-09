package repository

import (
	"github.com/google/uuid"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/auth"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
	"github.com/pkg/errors"
	"gorm.io/gorm"
)

type authRepo struct {
	db *gorm.DB
}

// NewAuthRepository creates a new auth repository
func NewAuthRepo(db *gorm.DB) auth.AuthRepository {
	return &authRepo{
		db: db,
	}
}

// DB Create new user
func (auth *authRepo) Register(user *models.User) (*models.User, error) {
	err := auth.db.Create(&user).Error
	if err != nil {
		return nil, errors.Wrap(err, "authRepo.Register.Create")
	}
	return user, nil
}

// DB Find user by email
func (auth *authRepo) GetByEmail(email string) (*models.User, error) {
	var user models.User
	err := auth.db.Where("email = ?", email).First(&user).Error
	if err != nil {
		return nil, errors.Wrap(err, "authRepo.GetByEmail.Where.First")
	}
	return &user, nil
}

// DB Find user by id
func (auth *authRepo) GetByID(userID uuid.UUID) (*models.User, error) {
	var user models.User
	err := auth.db.Where("user_id = ?", userID).First(&user).Error
	if err != nil {
		return nil, errors.Wrap(err, "authRepo.GetByID.Where.First")
	}
	return &user, nil
}

// DB Update user
func (auth *authRepo) Update(user *models.User) (*models.User, error) {
	err := auth.db.Where("user_id = ?", user.UserID).Updates(&user).Error
	if err != nil {
		return nil, errors.Wrap(err, "authRepo.Update.Where.Updates")
	}
	return user, nil
}

func (auth *authRepo) Delete(userID uuid.UUID) error {
	err := auth.db.Where("user_id = ?", userID).Delete(&models.User{}).Error
	if err != nil {
		return errors.Wrap(err, "authRepo.Delete.Where.Delete")
	}
	return nil
}
