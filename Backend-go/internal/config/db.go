package config

import (
	"database/sql"
	"log"

	_ "github.com/godror/godror"
)

var DB *sql.DB

func ConnectDB() error {
	var err error

	dsn := "king/king123@localhost:1521/xepdb1"

	DB, err = sql.Open("godror", dsn)
	if err != nil {
		log.Println("Failed to connect to database:", err)
		return err
	}

	err = DB.Ping()
	if err != nil {
		log.Println("Failed to ping database:", err)
		return err
	}

	log.Println("Database connected successfully")
	return nil
}

// func ConnectDB() error {
// 	log.Println("Skipping DB for test")
// 	return nil
// }