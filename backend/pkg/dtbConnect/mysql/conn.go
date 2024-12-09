package mysql

import (
	"fmt"
	"time"

	"github.com/nalgnaohel/INT3306-54---QAirline/backend/config"
	gormMySQL "gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func Connect(cfg *config.Config) (*gorm.DB, error) {
	dsn := fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=disable password=%s",
		cfg.MySQL.Host,
		cfg.MySQL.Port,
		cfg.MySQL.User,
		cfg.MySQL.DtbName,
		cfg.MySQL.Password,
	)

	// Open the connection with Gorm
	db, err := gorm.Open(gormMySQL.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	// Set the connection pool configuration
	mySQLDB, err := db.DB()
	if err != nil {
		return nil, err
	}
	mySQLDB.SetMaxOpenConns(cfg.MySQL.MaxOpenConns)
	mySQLDB.SetMaxIdleConns(cfg.MySQL.MaxIdleConns)
	mySQLDB.SetConnMaxLifetime(time.Duration(cfg.MySQL.ConnMaxLifetime) * time.Second)
	mySQLDB.SetConnMaxIdleTime(time.Duration(cfg.MySQL.ConnMaxIdeTime) * time.Second)

	return db, nil
}
