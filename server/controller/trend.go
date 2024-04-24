package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"pseudo-store/trend"
)

func TrendOne(context *gin.Context) {
	var t struct {
		Category     string `json:"category"`
		Subcategory  string `json:"subcategory"`
		LowAge       int    `json:"low_age"`
		HighAge      int    `json:"high_age"`
		Gender       string `json:"gender"`
		Municipality string `json:"municipality"`
		LowDate      string `json:"low_date"`
		HighDate     string `json:"high_date"`
	}

	if err := context.BindJSON(&t); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})

		return
	}

	trendOne, err := trend.GetTrendOne(t.Category, t.Subcategory, t.LowAge, t.HighAge, t.Gender, t.Municipality, t.LowDate, t.HighDate)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": trendOne})
}

func TrendTwo(context *gin.Context) {
	var t struct {
		Municipality string `json:"municipality"`
		LowDate      string `json:"low_date"`
		HighDate     string `json:"high_date"`
	}

	if err := context.BindJSON(&t); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})

		return
	}

	trendTwo, err := trend.GetTrendTwo(t.Municipality, t.LowDate, t.HighDate)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": trendTwo})
}

func TrendThree(context *gin.Context) {
	var t struct {
		LowDate  string `json:"low_date"`
		HighDate string `json:"high_date"`
		LowAge   int    `json:"low_age"`
		HighAge  int    `json:"high_age"`
	}

	if err := context.BindJSON(&t); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})

		return
	}

	trendThree, err := trend.GetTrendThree(t.LowDate, t.HighDate, t.LowAge, t.HighAge)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": trendThree})
}

func TrendFour(context *gin.Context) {
	var t struct {
		Gender       string `json:"gender"`
		Municipality string `json:"municipality"`
		LowDate      string `json:"low_date"`
		HighDate     string `json:"high_date"`
		LowAge       int    `json:"low_age"`
		HighAge      int    `json:"high_age"`
	}

	if err := context.BindJSON(&t); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})

		return
	}

	trendFour, err := trend.GetTrendFour(t.Municipality, t.Gender, t.LowDate, t.HighDate, t.LowAge, t.HighAge)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": trendFour})
}

func TrendFive(context *gin.Context) {
	var t struct {
		Season       string `json:"season"`
		CategoryName string `json:"category_name"`
		LowDate      string `json:"low_date"`
		HighDate     string `json:"high_date"`
		ItemCount    int    `json:"item_count"`
	}

	if err := context.BindJSON(&t); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})

		return
	}

	trendFive, err := trend.GetTrendFive(t.Season, t.CategoryName, t.LowDate, t.HighDate, t.ItemCount)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": trendFive})
}
