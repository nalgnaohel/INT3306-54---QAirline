package repository

import (
	"log"
	"strings"

	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/flight"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/pkg/utils"
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
	fquery := strings.Replace(flightID, "%20", " ", -1)
	err := f.db.Where("flight_id = ?", fquery).First(&flight).Error
	if err != nil {
		return nil, errors.Wrap(err, "flightRepo.GetByFlightID.First")
	}
	return &flight, nil
}

// DB Update flight
func (f *flightRepo) Update(flight *models.Flight) (*models.Flight, error) {
	fquery := strings.Replace(flight.FlightID, "%20", " ", -1)
	log.Println("repo-----", fquery)
	err := f.db.Where("flight_id = ?", fquery).Updates(&flight).Error
	if err != nil {
		return nil, errors.Wrap(err, "flightRepo.Update.Updates")
	}
	return flight, nil
}

// DB Delete flight
func (f *flightRepo) Delete(flightID string) error {
	fquery := strings.Replace(flightID, "%20", " ", -1)
	err := f.db.Where("flight_id = ?", fquery).Delete(&models.Flight{}).Error
	if err != nil {
		return errors.Wrap(err, "flightRepo.Delete.Delete")
	}
	return nil
}

// DB Find flights - case one way
func (f *flightRepo) GetFlightOneWay(departure string, arrival string, departureDate string) ([]*models.Flight, error) {
	// departureName := strings.Split(departure, "(")[0]
	// arrivalName := strings.Split(arrival, "(")[0]
	// departureCode := strings.Split(departure, "(")[1][:3]
	// arrivalCode := strings.Split(arrival, "(")[1][:3]
	departureCode := departure
	arrivalCode := arrival
	log.Println("repo", departureCode, arrivalCode, departureDate)
	var flights []*models.Flight
	err := f.db.
		Where("departure_code = ? AND arrival_code = ? AND DATE(departure_time) = ?", departureCode, arrivalCode, departureDate).
		Order("departure_time asc").
		Find(&flights).Error
	if err != nil {
		return nil, errors.Wrap(err, "flightRepo.GetFlightOneWay.Find")
	}
	log.Println("repo", len(flights))
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

// DB Get all flights
func (f *flightRepo) GetAll(query *utils.PagingQuery) (*models.FlightList, error) {
	//Co record nao dang Flight khom
	results := f.db.First(&models.Flight{})

	//loi khi query
	if results.Error != nil {
		return nil, errors.Wrap(results.Error, "flightRepo.GetAll.First")
	}

	totalCount := int(results.RowsAffected)

	//khong co record nao thoa man
	if totalCount == 0 {
		return &models.FlightList{
			TotalCount: 0,
			TotalPages: utils.GetTotalPages(0, query.GetQuerySize()),
			Page:       query.GetPage(),
			Size:       query.GetQuerySize(),
			HasMore:    false,
			Flights:    make([]*models.Flight, 0),
		}, nil
	}

	flights := make([]*models.Flight, 0, query.GetQuerySize())
	err := f.db.Raw(`
		SELECT *
		FROM flights`).Scan(&flights).Error
	if err != nil {
		return nil, errors.Wrap(err, "inspectionRepo.GetAll.Query")
	}

	return &models.FlightList{
		TotalCount: totalCount,
		TotalPages: utils.GetTotalPages(totalCount, query.GetQuerySize()),
		Page:       query.GetPage(),
		Size:       query.GetQuerySize(),
		HasMore:    query.GetPage() < utils.GetTotalPages(totalCount, query.GetQuerySize()),
		Flights:    flights,
	}, nil
}
