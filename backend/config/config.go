package config

import (
	"errors"
	"time"

	"github.com/gofiber/fiber/v2/log"
	"github.com/spf13/viper"
)

// Config - configuration struct
type Config struct {
	Server  ServerConfig
	MySQL   MySQL
	Cookie  Cookie
	Store   Store
	Session Session
}

// DatabaseConfig - database configuration struct
type MySQL struct {
	Host            string
	Port            string
	User            string
	Password        string
	DtbName         string
	MaxIdleConns    int
	MaxOpenConns    int
	ConnMaxLifetime int
	ConnMaxIdeTime  int
}

// ServerConfig - server configuration struct
type ServerConfig struct {
	Port              string
	AppVersion        string
	JwtSecretKey      string
	CookieName        string
	ReadTimeout       time.Duration
	WriteTimeout      time.Duration
	SSL               bool
	CtxDefaultTimeout time.Duration
	CSRF              bool
	Debug             bool
}

// Cookie - cookie configuration struct
type Cookie struct {
	Name     string
	MaxAge   int
	Secure   bool
	HTTPOnly bool
}

// Session - session configuration struct
type Session struct {
	Secret string
	Expire int
}

// Store - store configuration struct
type Store struct {
	ImageFolder string
}

// LoadConfig - loads configuration from file
func LoadConfig(configFileName string) (*viper.Viper, error) {
	vip := viper.New()
	log.Info("Loading config file: ", configFileName)
	vip.SetConfigName(configFileName)
	vip.AddConfigPath(".")
	vip.AutomaticEnv()

	err := vip.ReadInConfig()
	if err != nil {
		log.Fatalf("Error reading config file: %v !", err)
		return nil, errors.New("error reading config file")
	}

	return vip, nil
}

func ParseConfig(vip *viper.Viper) (*Config, error) {
	var config Config

	err := vip.Unmarshal(&config)
	if err != nil {
		return nil, errors.New("error parsing config file")
	}

	return &config, nil
}
