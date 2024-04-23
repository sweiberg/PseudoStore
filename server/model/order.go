package model

import (
	"gorm.io/gorm"
	"pseudo-store/db"
)

type Order struct {
	gorm.Model

	ID          uint    `gorm:"primary_key;unique_index:false"`
	LineNumber  uint    `gorm:"primary_key;unique_index:false;auto_increment:false"`
	UnitPrice   float64 `gorm:"type:decimal(10,2);not null" json:"price"`
	Quantity    uint    `gorm:"not null" json:"quantity"`
	MemberID    uint    `gorm:"not null" json:"member_id"`
	ProductID   uint    `gorm:"not null" json:"product_id"`
	PromotionID uint    `gorm:"null" json:"promotion_id"`

	Product   *Product
	Promotion *Promotion
	Payment   *Payment
	Shipment  []*Shipment
}

func (order *Order) Create() (*Order, error) {
	err := db.Oracle.Create(&order).Error

	if err != nil {
		return &Order{}, err
	}

	return order, nil
}
