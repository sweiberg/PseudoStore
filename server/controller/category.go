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

func PagShop(context *gin.Context) {
	pageStr := context.Query("_page")
	priceStr := context.Query("price")

	page, _ := strconv.Atoi(pageStr)
	price, _ := strconv.Atoi(priceStr)

	cat := context.Query("category")
	order := context.Query("order")
	search := context.Query("search")
	gender := context.Query("gender")

	category, err := model.GetCatPaginate(cat, page, price, order, search, gender)

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
