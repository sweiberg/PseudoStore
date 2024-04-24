package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"pseudo-store/model"
	"strconv"
)

func ViewCategory(context *gin.Context) {
	id, err := strconv.ParseUint(context.Param("id"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	category, err := model.GetCategoryByID(uint(id))

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": category})
}

func CatPagination(context *gin.Context) {
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

	price, err := strconv.ParseUint(context.Param("price"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	order := context.Param("order")
	search := context.Param("search")
	gender := context.Param("gender")

	category, err := model.GetCatPaginate(uint(id), uint(page), uint(price), order, search, gender)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": category})
}

func ViewCategoryPage(context *gin.Context) {
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

	category, err := model.GetCategoryPage(uint(id), uint(page))

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": category})
}

func ViewCategories(context *gin.Context) {
	categories, err := model.GetCategories()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": categories})
}
