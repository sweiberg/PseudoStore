package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"pseudo-store/db"
	"pseudo-store/model"
)

func DashboardStats(context *gin.Context) {
	var productCount, memberCount, orderCount, shipmentCount, deviceCount int64
	var categoryCount, subcategoryCount, paymentCount, promotionCount int64

	counts := map[interface{}]*int64{
		&model.Product{}:     &productCount,
		&model.Member{}:      &memberCount,
		&model.Order{}:       &orderCount,
		&model.Category{}:    &categoryCount,
		&model.Subcategory{}: &subcategoryCount,
		&model.Payment{}:     &paymentCount,
		&model.Promotion{}:   &promotionCount,
		&model.Shipment{}:    &shipmentCount,
		&model.Device{}:      &deviceCount,
	}

	var totalCount int64

	for modelObj, countPtr := range counts {
		err := db.Oracle.Model(modelObj).Distinct("id").Count(countPtr).Error

		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

			return
		}

		totalCount += *countPtr
	}

	context.JSON(http.StatusCreated, gin.H{
		"product_count": productCount,
		"member_count":  memberCount,
		"order_count":   orderCount,
		"total_count":   totalCount,
	})
}
