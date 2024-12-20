package models

type Promo struct {
	PromoID string `json:"promo_id"`
	Title   string `json:"title"`
	Content string `json:"content"`
	Amount  int    `json:"amount"`
}