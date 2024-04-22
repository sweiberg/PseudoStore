package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"pseudo-store/model"
	"strconv"
)

func ViewProduct(context *gin.Context) {
	id, err := strconv.ParseUint(context.Param("id"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	product, err := model.GetProductByID(uint(id))

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": product})
}
