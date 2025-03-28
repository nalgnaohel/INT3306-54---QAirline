package auth

import (
	"github.com/google/uuid"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/pkg/utils"
)

type AuthRepository interface {
	Register(user *models.User) (*models.User, error)
	GetByEmail(email string) (*models.User, error)
	GetByID(userID uuid.UUID) (*models.User, error)
	Update(user *models.User) (*models.User, error)
	Delete(userID uuid.UUID) error
	GetAll(query *utils.PagingQuery) (*models.UserList, error)
}
