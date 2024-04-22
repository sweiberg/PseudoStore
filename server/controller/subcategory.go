package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"pseudo-store/model"
	"strconv"
)

func ViewSubcategory(context *gin.Context) {
	id, err := strconv.ParseUint(context.Param("id"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	subcategory, err := model.GetSubcategoryByID(uint(id))

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": subcategory})
}

func ViewSubcategoryPage(context *gin.Context) {
	id, err := strconv.ParseUint(context.Param("id"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	page, err := strconv.ParseUint(context.Param("page"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	subcategory, err := model.GetSubcategoryPage(uint(id), uint(page))

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": subcategory})
}

func ViewSubcategories(context *gin.Context) {
	subcategories, err := model.GetSubcategories()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": subcategories})
}
