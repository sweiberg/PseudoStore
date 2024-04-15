package db

import (
	"fmt"
	"os"

	"github.com/cengsin/oracle"
	"gorm.io/gorm"
)

var Database *gorm.DB

func Connect() {
	var err error

	host := os.Getenv("DB_HOST")
	username := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	port := os.Getenv("DB_PORT")

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=America/New_York", host, username, password, dbName, port)
	Database, err = gorm.Open(oracle.Open(dsn), &gorm.Config{})

	if err != nil {
		panic(err)
	} else {
		fmt.Println("The Pseudo Store database has been successfully connected.")
	}
}
