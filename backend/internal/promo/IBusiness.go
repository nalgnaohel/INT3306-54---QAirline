package promo

import (
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
)

// PromoRepository is the interface that defines the methods that must be implemented by the promo repository
type PromoBusiness interface {
	Create(promo models.Promo) (models.Promo, error)
	GetByID(promoID string) (*models.Promo, error)
	Delete(promoID string) error
	Update(promoID string, promo models.Promo) error
	GetAll() ([]*models.Promo, error)
}