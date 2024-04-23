package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"pseudo-store/trend"
)

func GetTrendOne(context *gin.Context) {
	trendOne, err := trend.TrendOne()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": trendOne})
}
