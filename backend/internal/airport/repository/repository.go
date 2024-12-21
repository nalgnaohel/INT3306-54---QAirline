package repository

import (
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/airport"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
	"gorm.io/gorm"
)

type airportRepo struct {
	db *gorm.DB
}

// NewAirportRepository creates a new airport repository
func NewAirportRepo(db *gorm.DB) airport.AirportRepository {
	return &airportRepo{
		db: db,
	}
}

// DB Create new airport
func (a *airportRepo) Create(airport *models.Airport) (*models.Airport, error) {
	err := a.db.Create(&airport).Error
	if err != nil {
		return nil, err
	}
	return airport, nil
}

// DB Find airport by iata code
func (a *airportRepo) GetAirportByIataCode(iataCode string) (*models.Airport, error) {
	var airport models.Airport

	err := a.db.Where("iata_code = ?", iataCode).First(&airport).Error
	if err != nil {
		return nil, err
	}
	return &airport, nil
}

// DB Update airport
func (a *airportRepo) Update(airport *models.Airport) (*models.Airport, error) {
	err := a.db.Where("iata_code = ?", airport.IATACode).Updates(&airport).Error
	if err != nil {
		return nil, err
	}
	return airport, nil
}

// DB Delete airport by iata code
func (a *airportRepo) Delete(iataCode string) error {
	err := a.db.Where("iata_code = ?", iataCode).Delete(&models.Airport{}).Error
	if err != nil {
		return err
	}
	return nil
}

// DB Get all airports
func (a *airportRepo) GetAll() ([]models.Airport, error) {
	var airports []models.Airport

	err := a.db.Find(&airports).Error
	if err != nil {
		return nil, err
	}
	return airports, nil
}
