package main

import (
	"log"

	"database/sql"

	"github.com/nalgnaohel/INT3306-54---QAirline/backend/config"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/internal/server"
	"github.com/nalgnaohel/INT3306-54---QAirline/backend/pkg/dtbConnect/mysql"
)

func main() {
	//Start the server
	log.Println("Start")

	//Load config file
	configPath := "config/config-docker"

	cfgFile, err := config.LoadConfig(configPath)

	if err != nil {
		log.Fatalf("Error loading config file: %v", err)
	}

	cfg, err := config.ParseConfig(cfgFile)
	if err != nil {
		log.Fatalf("Error parsing config file: %v", err)
	}

	//Initialize database
	mySQLDB, err := mysql.Connect(cfg)
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	} else {
		mySQLDB, err := mySQLDB.DB()
		if err != nil {
			defer func(mySQLDB *sql.DB) {
				err := mySQLDB.Close()
				if err != nil {

				}
			}(mySQLDB)
		}
	}

	s := server.NewServer(cfg, mySQLDB)
	err = s.Start()
	if err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
