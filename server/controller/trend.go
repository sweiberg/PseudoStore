package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"pseudo-store/trend"
)

func TrendOne(context *gin.Context) {
	trendOne, err := trend.GetTrendOne()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": trendOne})
}
