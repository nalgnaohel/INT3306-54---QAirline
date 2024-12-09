package models

type Airport struct {
	AirportID string `json:"airport_id"`
	Name      string `json:"name"`
	City      string `json:"city"`
	Country   string `json:"country"`
	IATACode  string `json:"iata_code"`
}
