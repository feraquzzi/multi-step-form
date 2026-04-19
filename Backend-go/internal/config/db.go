package config

import (
	"database/sql"
	"log"

	_ "github.com/godror/godror"
)

var DB *sql.DB

func ConnectDB() error{
	var err error

	dsn := "king/king123@localhost:1521/xepdb1"

	DB, err = sql.Open("godror", dsn)
	if err != nil {
		log.Fatal("Failed to Connect to the database", err)
		return err
	}	

	err = DB.Ping()
	if err != nil {
		log.Fatal("Failed to Ping to the database", err)
	return err
	}

	return nil

}