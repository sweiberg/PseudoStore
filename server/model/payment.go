package model

import (
	"gorm.io/gorm"
	"pseudo-store/currency"
)

type Payment struct {
	gorm.Model

	Status         string       `gorm:"size:100;not null" json:"type"`
	ChargedPrice   currency.USD `gorm:"type:decimal(10,2);not null" json:"charged_price"`
	TaxPrice       currency.USD `gorm:"type:decimal(10,2);not null" json:"tax_price"`
	ShippingPrice  currency.USD `gorm:"type:decimal(10,2);not null" json:"shipping_price"`
	PromotionValue currency.USD `gorm:"type:decimal(10,2);null" json:"promotion_value"`
	Method         string       `gorm:"size:100;not null" json:"method"`
	OrderID        uint         `gorm:"not null" json:"order_id"`
	MemberID       uint         `gorm:"not null" json:"member_id"`
}
