package repository

import (
	"strings"

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
		return nil, errors.Wrap(err, "flightRepo.GetByFlightID.First")
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
		return nil, errors.Wrap(err, "flightRepo.Update.Updates")
	}
	return flight, nil
}

// DB Delete flight
func (f *flightRepo) Delete(flightID string) error {
	err := f.db.Where("flight_id = ?", flightID).Delete(&models.Flight{}).Error
	if err != nil {
		return errors.Wrap(err, "flightRepo.Delete.Delete")
	}
	return nil
}

// DB Find flights - case one way
func (f *flightRepo) GetFlightOneWay(departure string, arrival string, departureDate string) ([]*models.Flight, error) {
	// departureName := strings.Split(departure, "(")[0]
	// arrivalName := strings.Split(arrival, "(")[0]
	departureCode := strings.Split(departure, "(")[1][:3]
	arrivalCode := strings.Split(arrival, "(")[1][:3]

	var flights []*models.Flight
	err := f.db.
		Where("departure_code = ? AND arrival_code = ? AND DATE(departure_time) = ?", departureCode, arrivalCode, departureDate).
		Order("departure_time asc").
		Find(&flights).Error
	if err != nil {
		return nil, errors.Wrap(err, "flightRepo.GetFlightOneWay.Find")
	}
	return flights, nil
}

// DB Find flights - case round trip
func (f *flightRepo) GetFlightRoundTrip(departure string, arrival string, departureDate string, returnDate string) ([]*models.Flight, error) {
	departureCode := strings.Split(departure, "(")[1][:3]
	arrivalCode := strings.Split(arrival, "(")[1][:3]

	var flights []*models.Flight
	err := f.db.
		Where("departure_code = ? AND arrival_code = ? AND DATE(departure_time) = ?", departureCode, arrivalCode, departureDate).
		Order("departure_time asc").
		Find(&flights).Error
	if err != nil {
		return nil, errors.Wrap(err, "flightRepo.GetFlightRoundTrip.Find")
	}
	return flights, nil
}

//DB Find flights - case multi city
// func (f *flightRepo) GetFlightMultiCity(departure string, arrival string, departureDate string) ([]*models.Flight, error) {
// 	// departureName := strings.Split(departure, "(")[0]
// 	// arrivalName := strings.Split(arrival, "(")[0]
// 	departureCode := strings.Split(departure, "(")[1][:3]
// 	arrivalCode := strings.Split(arrival, "(")[1][:3]

// 	var flights []*models.Flight
// 	err := f.db.
// 		Where("departure_code = ? AND arrival_code = ? AND DATE(departure_time) = ?", departureCode, arrivalCode, departureDate).
// 		Order("departure_time asc").
// 		Find(&flights).Error
// 	if err != nil {
// 		return nil, errors.Wrap(err, "flightRepo.GetFlightMultiCity.Find")
// 	}
// 	return flights, nil
// }
