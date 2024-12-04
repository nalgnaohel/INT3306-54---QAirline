package models

import (
	"strings"
	"time"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	UserID      uuid.UUID `json:"user_id"`
	FirstName   string    `json:"first_name"`
	LastName    string    `json:"last_name"`
	DOB         time.Time `json:"dob"`
	Gender      string    `json:"gendee"`
	Email       string    `json:"email"`
	Password    string    `json:"password"`
	PhoneNumber string    `json:"phone_number"`
	Avatar      string    `json:"avatar"`
	Nationality string    `json:"nationality"`
	Type        string    `json:"type"` // admin, client
	IdentityNo  string    `json:"identity_id"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	LoginDate   time.Time `json:"login_date"`
}

// HashPassword hashes the password of the user with bcrypt
func (u *User) HashPassword() error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)
	return nil
}

// ComparePassword compares password
func (u *User) ComparePassword(password string) error {
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
	if err != nil {
		return err
	}
	return nil
}

// SanitizePassword Sanitize user password
func (u *User) SanitizePassword() {
	u.Password = ""
}

// PrepareCreate Before user for register
func (u *User) PrepareCreate() error {
	u.Password = strings.TrimSpace(u.Password)

	err := u.HashPassword()
	if err != nil {
		return err
	}

	return nil
}

type UserWithToken struct {
	User  *User  `json:"user"`
	Token string `json:"token"`
}
