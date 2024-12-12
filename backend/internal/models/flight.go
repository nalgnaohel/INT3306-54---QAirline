package models

type Flight struct {
	FlightID       string  `json:"flight_id"`
	Brand          string  `json:"brand"`
	Departure      string  `json:"departure"`
	Arrival        string  `json:"arrival"`
	DepartureTime  string  `json:"departure_time"`
	ArrivalTime    string  `json:"arrival_time"`
	Price          float64 `json:"price"`
	PassengersList []User  `json:"passengers_list"`
}
