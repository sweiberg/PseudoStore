package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"pseudo-store/currency"
	"pseudo-store/external"
	"pseudo-store/helper"
	"pseudo-store/model"
)

func Checkout(context *gin.Context) {
	member, err := helper.GetThisMember(context)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	type checkout struct {
		ProductID uint `json:"id"`
		Quantity  uint `json:"quantity"`
	}

	var checkoutProducts []checkout

	if err := context.BindJSON(&checkoutProducts); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	var orders []model.Order
	var payment model.Payment
	var product model.Product
	var price float64 = 5.0

	for i := 0; i < len(checkoutProducts); i++ {
		product, err = model.GetProductByID(checkoutProducts[i].ProductID)

		if err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return
		}

		if product.Quantity < checkoutProducts[i].Quantity {
			context.JSON(http.StatusBadRequest, gin.H{"error": "The requested item does not have enough inventory available."})

			return
		}

		var order model.Order
		order.MemberID = member.ID
		order.UnitPrice = product.Price
		order.LineNumber = uint(i + 1)
		order.Quantity = checkoutProducts[i].Quantity
		order.ProductID = product.ID

		orders = append(orders, order)

		price += product.Price
	}

	USD := currency.FloatToUSD(price)
	USD.Multiply(0.11)

	charge, err := external.StripeProcessCharge(USD, member.Email)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	if charge.Amount == 0 {
		context.JSON(http.StatusBadRequest, gin.H{"error": "The charge amount cannot be 0."})

		return
	}

	for i := 0; i < len(orders); i++ {
		create, err := orders[i].Create()

		if err != nil {
			return
		}

		if i == 0 {
			payment.OrderID = create.ID
		}
	}

	context.JSON(http.StatusCreated, gin.H{"data": "success"})
}

/*
func AddTransaction(context *gin.Context) {
	//var input model.Transaction

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	id, err := helper.GetThisUserID(context)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	input.BuyerID = id

	newTransaction, err := input.Create()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusCreated, gin.H{"data": newTransaction})
}

func ViewTransaction(context *gin.Context) {
	id, err := strconv.ParseUint(context.Param("id"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	transaction, err := model.GetTransactionByID(uint(id))

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	userID, err := helper.GetThisUserID(context)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	if transaction.BuyerID != userID && transaction.SellerID != userID {
		context.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": transaction})
}
*/
