package main

import (
	"log"
	"pseudo-store/controller"
	"pseudo-store/db"
	"pseudo-store/middleware"
	"pseudo-store/model"

	"github.com/gin-gonic/gin"

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

	authAPI := router.Group("/auth")

	authAPI.POST("/register", controller.Register)
	authAPI.POST("/login", controller.Login)
	authAPI.GET("/authorize", controller.Authorize)

	publicAPI := router.Group("/api")

	publicAPI.GET("/product/:id", controller.ViewProduct)
	publicAPI.GET("/product/popular/:limit", controller.ViewPopularProducts)

	publicAPI.GET("/shop", controller.PagShop)
	publicAPI.GET("/category/:id", controller.ViewCategory)
	publicAPI.GET("/category/all", controller.ViewCategories)
	publicAPI.GET("/category/:id/p/:page", controller.ViewCategoryPage)

	publicAPI.GET("/subcategory/:id", controller.ViewSubcategory)
	publicAPI.GET("/subcategory/all", controller.ViewSubcategories)
	publicAPI.GET("/subcategory/:id/p/:page", controller.ViewSubcategoryPage)

	protectedAPI := router.Group("/api")
	protectedAPI.Use(middleware.VerifyJWT())

	protectedAPI.GET("/profile", controller.ViewProfile)
	protectedAPI.POST("/profile/edit", controller.EditProfile)

	protectedAPI.GET("/dashboard/stats", controller.DashboardStats)
	protectedAPI.POST("/dashboard/trend/1", controller.TrendOne)
	protectedAPI.POST("/dashboard/trend/2", controller.TrendTwo)
	protectedAPI.POST("/dashboard/trend/3", controller.TrendThree)
	protectedAPI.POST("/dashboard/trend/4", controller.TrendFour)
	protectedAPI.POST("/dashboard/trend/5", controller.TrendFive)

	router.Run(":4300")
}
