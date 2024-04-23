package model

import (
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

func GetSubcategoryByID(id uint) (Subcategory, error) {
	var subcategory Subcategory

	err := db.Oracle.Preload("Category").Where("id=?", id).Find(&subcategory).Error

	if err != nil {
		return Subcategory{}, err
	}

	return subcategory, nil
}

func GetSubcategoryPage(id uint, page uint) (Subcategory, error) {
	var subcategory Subcategory
	var products []*Product

	err := db.Oracle.Preload("Category").Where("id=?", id).Find(&subcategory).Error

	if err != nil {
		return Subcategory{}, err
	}

	offset := int(page-1) * 10
	err = db.Oracle.Model(&subcategory).Offset(offset).Limit(10).Association("Products").Find(&products)

	if err != nil {
		return Subcategory{}, err
	}

	subcategory.Products = products

	return subcategory, nil
}

func GetSubcategories() ([]Subcategory, error) {
	var subcategories []Subcategory

	err := db.Oracle.Preload("Category").Order("name ASC").Find(&subcategories).Error

	if err != nil {
		return []Subcategory{}, err
	}

	return subcategories, nil
}
