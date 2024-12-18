package repository

import (
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/flight"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
	"github.com/pkg/errors"
	"gorm.io/gorm"
)

type flightRepo struct {
	db *gorm.DB
}

// NewFlightRepository creates a new flight repository
func NewFlightRepo(db *gorm.DB) flight.FlightRepository {
	return &flightRepo{
		db: db,
	}
}

// DB Create new flight
func (f *flightRepo) Create(flight *models.Flight) (*models.Flight, error) {
	err := f.db.Create(&flight).Error
	if err != nil {
		return nil, errors.Wrap(err, "flightRepo.Create.Create")
	}
	return flight, nil
}

// DB Find flight by id
func (f *flightRepo) GetByFlightID(flightID string) (*models.Flight, error) {
	var flight models.Flight
	err := f.db.Where("flight_id = ?", flightID).First(&flight).Error
	if err != nil {
		return nil, err
	}
	return &flight, nil
}

// DB Find all flights
// func (f *flightRepo) GetAll() ([]*flight.Flight, error) {
// 	var flights []*models.Flight
// 	err := f.db.Find(&flights).Error
// 	if err != nil {
// 		return nil, err
// 	}
// 	return flights, nil
// }

// DB Update flight
func (f *flightRepo) Update(flight *models.Flight) (*models.Flight, error) {
	err := f.db.Where("flight_id = ?", flight.FlightID).Updates(&flight).Error
	if err != nil {
		return nil, err
	}
	return flight, nil
}
