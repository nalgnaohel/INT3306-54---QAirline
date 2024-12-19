package repository

import (
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
	"gorm.io/gorm"
)

type AircraftRepository struct {
	db *gorm.DB
}

func NewAircraftRepo(db *gorm.DB) *AircraftRepository {
	return &AircraftRepository{
		db: db,
	}
}

func (ar *AircraftRepository) Create(aircraft *models.Aircraft) (*models.Aircraft, error) {
	if err := ar.db.Create(aircraft).Error; err != nil {
		return nil, err
	}
	return aircraft, nil
}

func (ar *AircraftRepository) GetByAircraftID(aircraftID string) (*models.Aircraft, error) {
	aircraft := &models.Aircraft{}
	if err := ar.db.Where("aircraft_id = ?", aircraftID).First(aircraft).Error; err != nil {
		return nil, err
	}
	return aircraft, nil
}

func (ar *AircraftRepository) Update(aircraft *models.Aircraft) (*models.Aircraft, error) {
	err := ar.db.Where("aircraft_id = ?", aircraft.AircraftID).Updates(aircraft).Error
	if err != nil {
		return nil, err
	}
	return aircraft, nil
}

func (ar *AircraftRepository) Delete(aircraftID string) error {
	if err := ar.db.Where("aircraft_id = ?", aircraftID).Delete(&models.Aircraft{}).Error; err != nil {
		return err
	}
	return nil
}

func (ar *AircraftRepository) GetAll() ([]*models.AircraftList, error) {
	aircrafts := []*models.AircraftList{}
	if err := ar.db.Find(&aircrafts).Error; err != nil {
		return nil, err
	}
	return aircrafts, nil
}
