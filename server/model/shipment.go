package model

import (
	"gorm.io/gorm"
	"time"
)

type Shipment struct {
	gorm.Model

	Tracking    string    `gorm:"size:255;null" json:"tracking"`
	ShippedDate time.Time `json:"shipped_date"`
	OrderID     uint      `json:"order_id"`
}
