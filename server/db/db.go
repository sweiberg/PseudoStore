package db

import (
	"fmt"
	oracle "github.com/godoes/gorm-oracle"
	"gorm.io/gorm"
	"os"
)

var Oracle *gorm.DB

func Connect() {
	var err error

	address := os.Getenv("DB_ADDRESS")
	username := os.Getenv("DB_USERNAME")
	password := os.Getenv("DB_PASSWORD")
	serviceName := os.Getenv("DB_SERVICENAME")
	port := os.Getenv("DB_PORT")

	dsn := fmt.Sprintf("oracle://%s:%s@%s:%s/%s", username, password, address, port, serviceName)
	Oracle, err = gorm.Open(oracle.Open(dsn), &gorm.Config{})

	if err != nil {
		panic(err)
	} else {
		fmt.Println("Connected to the Oracle database successfully.")
	}
}
