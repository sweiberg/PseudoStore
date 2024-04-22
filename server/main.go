package main

import (
	"log"
	"pseudo-store/db"
	"pseudo-store/model"

	"github.com/joho/godotenv"
)

func main() {
	loadEnv()
	loadDB()
}

func loadDB() {
	db.Connect()

	tables := []interface{}{
		&model.Payment{},
		&model.Shipment{},
		&model.Device{},
		&model.PromotionMap{},
		&model.Order{},
	}

	for _, table := range tables {
		if !db.Oracle.Migrator().HasTable(table) {
			db.Oracle.AutoMigrate(table)
		}
	}

	model.PrintAll()
	model.PrintAll2()
}

func loadEnv() {
	err := godotenv.Load(".env.local")

	if err != nil {
		log.Fatal("Error! The .env file could not be loaded.")
	}
}
