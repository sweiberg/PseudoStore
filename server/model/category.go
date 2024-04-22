package model

import (
	"gorm.io/gorm"
)

type Category struct {
	gorm.Model

	Name    string `gorm:"size:150;not null" json:"name"`
	Summary string `gorm:"size:150;not null" json:"summary"`

	Subcategories []*Subcategory  `json:"subcategories"`
	Products      []*Product      `json:"products"`
	Promotions    []*PromotionMap `gorm:"polymorphic:Poly;polymorphicValue:category"`
}
