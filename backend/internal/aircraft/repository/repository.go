package repository

import (
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/models"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/pkg/utils"
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

func (ar *AircraftRepository) GetAll(query *utils.PagingQuery) (*models.AircraftList, error) {
	res := ar.db.First(&models.Aircraft{})
	if res.Error != nil {
		return nil, res.Error
	}

	totalCount := int(res.RowsAffected)
	if totalCount == 0 {
		return &models.AircraftList{
			TotalCount: 0,
			TotalPages: utils.GetTotalPages(0, query.GetQuerySize()),
			Page:       query.GetPage(),
			Size:       query.GetQuerySize(),
			HasMore:    false,
			Aircrafts:  []*models.Aircraft{},
		}, nil
	}

	aircrafts := make([]*models.Aircraft, 0, query.GetQuerySize())
	err := ar.db.Raw(`SELECT * from aircrafts`).Scan(&aircrafts).Error
	if err != nil {
		return nil, err
	}

	return &models.AircraftList{
		TotalCount: totalCount,
		TotalPages: utils.GetTotalPages(totalCount, query.GetQuerySize()),
		Page:       query.GetPage(),
		Size:       query.GetQuerySize(),
		HasMore:    query.GetPage() < utils.GetTotalPages(totalCount, query.GetQuerySize()),
		Aircrafts:  aircrafts,
	}, nil
}

func (ar *AircraftRepository) GetByAircraftModel(model string) (*models.Aircraft, error) {
	aircraft := &models.Aircraft{}
	if err := ar.db.Where("model = ?", model).First(aircraft).Error; err != nil {
		return nil, err
	}
	return aircraft, nil
}
