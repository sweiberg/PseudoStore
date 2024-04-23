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
