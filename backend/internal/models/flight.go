package models

import "time"

type Flight struct {
	FlightID      string    `json:"flight_id"`
	Brand         string    `json:"brand"`
	DepartureCode string    `json:"departure_code"`
	ArrivalCode   string    `json:"arrival_"`
	DepartureTime time.Time `json:"departure_time"`
	ArrivalTime   time.Time `json:"arrival_time"`
	Price         float64   `json:"price"`
	//PassengersList []User    `json:"passengers_list"`
	AvailableSeats int    `json:"available_seats"`
	AircraftID     string `json:"aircraft_id"`
	Status         string `json:"status"`
}
