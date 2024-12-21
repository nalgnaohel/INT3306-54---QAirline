package repository

import (

	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/promo"
	"gorm.io/gorm"
)

type promoRepository struct {
	db *gorm.DB
}

// NewPromoRepository creates a new promo repository
func NewPromoRepo(db *gorm.DB) promo.PromoRepository {
	return &promoRepository{
		db: db,
	}
}

// DB Create a new promo
func (pr *promoRepository) Create(promo models.Promo) (models.Promo, error) {
	err := pr.db.Create(&promo).Error
	if err != nil {
		return models.Promo{}, err
	}
	return promo, nil
}

// DB Update a promo
func (pr *promoRepository) Update(promoID string, promo models.Promo) error {
	result := pr.db.Model(&models.Promo{}).Where("promo_id = ?", promoID).Updates(promo)
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

// DB Delete promo by ID
func (pr *promoRepository) Delete(promoID string) error {
	result := pr.db.Where("promo_id = ?", promoID).Delete(&models.Promo{})
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

// DB Get promo by ID
func (pr *promoRepository) GetByID(promoID string) (*models.Promo, error) {
	promo := &models.Promo{}
	err := pr.db.Where("promo_id = ?", promoID).First(promo).Error
	if err != nil {
		return nil, err
	}
	return promo, nil
}

// DB Get all promos
func (pr *promoRepository) GetAll() ([]*models.Promo, error) {
	var promos []*models.Promo
	err := pr.db.Find(&promos).Error
	if err != nil {
		return nil, err
	}
	return promos, nil
}

