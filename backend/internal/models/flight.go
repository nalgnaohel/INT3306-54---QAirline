package models

import "time"

type Flight struct {
	FlightID       string    `json:"flight_id"`
	Brand          string    `json:"brand"`
	Departure      string    `json:"departure"`
	Arrival        string    `json:"arrival"`
	DepartureTime  time.Time `json:"departure_time"`
	ArrivalTime    time.Time `json:"arrival_time"`
	Price          float64   `json:"price"`
	PassengersList []User    `json:"passengers_list"`
	AvailableSeats int       `json:"available_seats"`
}
