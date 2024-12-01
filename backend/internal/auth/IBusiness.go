package auth

import (
	"github.com/google/uuid"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
)

type AuthBusiness interface {
	Register(user *models.User) (*models.User, error)
	GetByEmail(email string) (*models.User, error)
	Login(email string, password string) (*models.User, error)
	Update(user *models.User) (*models.User, error)
	Delete(uuid uuid.UUID) error
	GetByUserID(uuid uuid.UUID) (*models.User, error)
}
