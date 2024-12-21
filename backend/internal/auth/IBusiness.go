package auth

import (
	"github.com/google/uuid"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/pkg/utils"
)

type AuthBusiness interface {
	Register(user *models.User) (*models.TokenedUser, error)
	Login(email string, password string) (*models.TokenedUser, error)
	Update(user *models.User) (*models.User, error)
	Delete(uuid uuid.UUID) error
	GetByEmail(email string) (*models.User, error)
	GetByID(uuid uuid.UUID) (*models.User, error)
	GetAll(query *utils.PagingQuery) (*models.UserList, error)
	ChangePassword(uuid uuid.UUID, oldPassword string, newPassword string) (*models.User, error)
}
