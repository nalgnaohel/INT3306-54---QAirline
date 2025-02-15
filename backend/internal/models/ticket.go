package models

import (
	"time"
)

type Ticket struct {
	TicketID      string    `json:"ticket_id"`
	FlightID      string    `json:"flight_id"`
	Email        string    `json:"email"`
	IdentityNo	string    `json:"identity_no"`
	SeatNumber    string    `json:"seat_number"`
	Price         float64   `json:"price"`
	Departure     string    `json:"departure"`
	Arrival       string    `json:"arrival"`
	DepartureTime time.Time `json:"departure_time"`
	ArrivalTime   time.Time `json:"arrival_time"`
	BookedAt      time.Time `json:"booked_at"`
	// TicketClass   string    `json:"class_ticket"`
}
