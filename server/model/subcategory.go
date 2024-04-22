package model

import (
	"gorm.io/gorm"
)

type Subcategory struct {
	gorm.Model

	Name       string `gorm:"size:150;not null" json:"name"`
	Summary    string `gorm:"size:150;not null" json:"summary"`
	CategoryID uint   `gorm:"not null" json:"category_id"`

	Category   *Category       `json:"category"`
	Products   []*Product      `json:"products"`
	Promotions []*PromotionMap `gorm:"polymorphic:Poly;polymorphicValue:subcategory"`
}
