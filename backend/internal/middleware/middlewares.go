package middleware

import (
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/config"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/auth"
)

type Middleware struct {
	authBusiness auth.AuthBusiness
	cfg          config.Config
}

func NewMiddleware(authBusiness auth.AuthBusiness, cfg config.Config) *Middleware {
	return &Middleware{
		authBusiness: authBusiness,
		cfg:          cfg,
	}
}
