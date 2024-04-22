package model

import (
	"fmt"
	"gorm.io/gorm"
	"pseudo-store/db"
)

type Category struct {
	gorm.Model

	Name    string `gorm:"size:150;not null" json:"name"`
	Summary string `gorm:"size:150;not null" json:"summary"`

	Subcategories []*Subcategory  `json:"subcategories"`
	Products      []*Product      `json:"products"`
	Promotions    []*PromotionMap `gorm:"polymorphic:Poly;polymorphicValue:category"`
}

func PrintAll() {
	var category Category
	db.Oracle.First(&category)

	fmt.Printf("ID: %d, Name: %s, Summary: %s\n", category.ID, category.Name, category.Summary)
}
