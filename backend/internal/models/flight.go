package models

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"time"
)


type PassengersList []User

type Flight struct {
    FlightID       string         `json:"flight_id"`
    Brand          string         `json:"brand"`
    Departure      string         `json:"departure"`
    Arrival        string         `json:"arrival"`
    DepartureTime  time.Time      `json:"departure_time"`
    ArrivalTime    time.Time      `json:"arrival_time"`
    Price          float64        `json:"price"`
    PassengersList PassengersList `json:"passengers_list"`
    AvailableSeats int            `json:"available_seats"`
}

// Implement the Valuer interface for PassengersList
func (p PassengersList) Value() (driver.Value, error) {
    return json.Marshal(p)
}

// Implement the Scanner interface for PassengersList
func (p *PassengersList) Scan(value interface{}) error {
    b, ok := value.([]byte)
    if !ok {
        return errors.New("type assertion to []byte failed")
    }
    return json.Unmarshal(b, &p)
}