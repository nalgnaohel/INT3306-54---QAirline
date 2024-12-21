package business

import (
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/promo"
	"github.com/pkg/errors"
)

type promoUsecase struct {
	promoRepo promo.PromoRepository
}

// NewPromoUsecase creates a new promo usecase
func NewPromoUsecase(promoRepo promo.PromoRepository) promo.PromoBusiness {
	return &promoUsecase{
		promoRepo: promoRepo,
	}
}

// Create creates a new promo
func (pu *promoUsecase) Create(promo models.Promo) (models.Promo, error) {
	createdPromo, err := pu.promoRepo.Create(promo)
	if err != nil {
		return models.Promo{}, errors.Wrap(err, "promoUsecase.Create")
	}
	return createdPromo, nil
}

// GetByID gets a promo by ID
func (pu *promoUsecase) GetByID(promoID string) (*models.Promo, error) {
	promo, err := pu.promoRepo.GetByID(promoID)
	if err != nil {
		return nil, errors.Wrap(err, "promoUsecase.GetByID")
	}
	return promo, nil
}

// Delete deletes a promo by ID
func (pu *promoUsecase) Delete(promoID string) error {
	err := pu.promoRepo.Delete(promoID)
	if err != nil {
		return errors.Wrap(err, "promoUsecase.Delete")
	}
	return nil
}

// Update updates a promo
func (pu *promoUsecase) Update(promoID string, promo models.Promo) error {
	err := pu.promoRepo.Update(promoID, promo)
	if err != nil {
		return errors.Wrap(err, "promoUsecase.Update")
	}
	return nil
}

// GetAll gets all promos
func (pu *promoUsecase) GetAll() ([]*models.Promo, error) {
	promos, err := pu.promoRepo.GetAll()
	if err != nil {
		return nil, errors.Wrap(err, "promoUsecase.GetAll")
	}
	promoValues := make([]*models.Promo, len(promos))
	copy(promoValues, promos)
	return promoValues, nil
}
