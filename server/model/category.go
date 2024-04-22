package model

import (
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

func GetCategoryByID(id uint) (Category, error) {
	var category Category

	err := db.Oracle.Preload("Products").Where("id=?", id).Find(&category).Error

	if err != nil {
		return Category{}, err
	}

	return category, nil
}

func GetCategorySubcategories(id uint) ([]Category, error) {
	var category []Category

	err := db.Oracle.Preload("Subcategories").Where("id=?", id).Find(&category).Error

	if err != nil {
		return []Category{}, err
	}

	return category, nil
}

func GetCategoriesItems(limit int) ([]Category, error) {
	var categories []Category

	err := db.Oracle.Preload("Products").Find(&categories).Error

	if err != nil {
		return []Category{}, err
	}

	return categories, nil
}

func GetCategories() ([]Category, error) {
	var categories []Category

	err := db.Oracle.Order("name ASC").Find(&categories).Error

	if err != nil {
		return []Category{}, err
	}

	return categories, nil
}
