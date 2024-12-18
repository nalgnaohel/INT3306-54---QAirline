package models

type Aircraft struct {
	AircraftID         int    `json:"aircraft_id"`
	Manufacturer       string `json:"manufacturer"`
	EconomyClassSeats  int    `json:"economy_class_seats"`
	BusinessClassSeats int    `json:"business_class_seats"`
	FirstClassSeats    int    `json:"first_class_seats"`
	PremiumClassSeats  int    `json:"premium_class_seats"`
	TotalSeats         int    `json:"total_seats"`
	RangeInKm          int    `json:"range_in_km"`
	Description        string `json:"description"`
}
