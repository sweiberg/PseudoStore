package model

import (
	"fmt"
	"gorm.io/gorm"
	"pseudo-store/db"
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

func PrintAll2() {
	var subcategories []*Subcategory
	db.Oracle.Where("category_id = ?", 4).Find(&subcategories)

	// Print the subcategories
	fmt.Println("Subcategories in Category ID 4:")
	for _, subcategory := range subcategories {
		fmt.Printf("ID: %d, Name: %s, Summary: %s, CategoryID: %d\n", subcategory.ID, subcategory.Name, subcategory.Summary, subcategory.CategoryID)
	}
}
