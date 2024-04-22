package main

import (
	"github.com/gin-gonic/gin"
	"log"
	"pseudo-store/controller"
	"pseudo-store/db"
	"pseudo-store/middleware"
	"pseudo-store/model"

	"github.com/joho/godotenv"
)

func main() {
	loadEnv()
	loadDB()
	loadRoutes()
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
}

func loadEnv() {
	err := godotenv.Load(".env.local")

	if err != nil {
		log.Fatal("Error! The .env file could not be loaded.")
	}
}

func loadRoutes() {
	router := gin.Default()
	router.Use(middleware.CORS())

	publicAPI := router.Group("/api")
	publicAPI.GET("/product/:id", controller.ViewProduct)
	publicAPI.GET("/category/:id", controller.ViewCategory)
	publicAPI.GET("/category/all/:limit", controller.ViewCategoriesItems)
	publicAPI.GET("/category/all", controller.ViewCategories)
	publicAPI.GET("/category/subs/:id", controller.ViewCategorySubcategories)

	router.Run(":4300")
}
