package model

import (
	"gorm.io/gorm"
	"time"
)

type Promotion struct {
	gorm.Model

	Code            string    `gorm:"size:150;not null;unique" json:"code"`
	Expiration      time.Time `json:"expiration"`
	AllProducts     bool      `gorm:"not null" json:"all_products"`
	DiscountPercent float64   `gorm:"not null" json:"discount"`
	DiscountPrice   float64   `gorm:"type:decimal(10,2);not null" json:"discount_price"`

	Map []*PromotionMap
}

type PromotionMap struct {
	gorm.Model

	PolyID      uint
	PolyType    string
	PromotionID uint
}
