package models

type Aircraft struct {
	AircraftID         string `json:"aircraft_id"`
	Model              string `json:"model"`
	Manufacturer       string `json:"manufacturer"`
	EconomyClassSeats  int    `json:"economy_class_seats"`
	BusinessClassSeats int    `json:"business_class_seats"`
	FirstClassSeats    int    `json:"first_class_seats"`
	PremiumClassSeats  int    `json:"premium_class_seats"`
	TotalSeats         int    `json:"total_seats"`
	RangeInKm          int    `json:"range_in_km"`
	Description        string `json:"description"`
}

type AircraftList struct {
	TotalCount int         `json:"total_count"`
	TotalPages int         `json:"total_pages"`
	Page       int         `json:"page"`
	Size       int         `json:"size"`
	HasMore    bool        `json:"has_more"`
	Aircrafts  []*Aircraft `json:"aircrafts"`
}
