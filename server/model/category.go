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

	err := db.Oracle.Preload("Subcategories").Where("id=?", id).Find(&category).Error

	if err != nil {
		return Category{}, err
	}

	return category, nil
}

func GetCategoryByName(name string) (uint, error) {
	var category Category

	err := db.Oracle.Preload("Subcategories").Where("name=?", name).Find(&category).Error

	if err != nil {
		return 0, err
	}

	return category.ID, nil
}

func GetCatPaginate(category string, page int, price int, order string, search string, gender string) ([]Product, error) {
	var products []Product

	query := db.Oracle.Model(&Product{})

	if category != "" {
		id, _ := GetCategoryByName(category)
		query = query.Where("category_id = ?", id)
	}

	if search != "" && search != "0" {
		query = query.Where("Name LIKE ?", "%"+search+"%")
	}

	if price != 0 {
		query = query.Where("Price >= ?", price)
	}

	if order == "asc" {
		query = query.Order("Name ASC")
	} else {
		query = query.Order("Name DESC")
	}

	if gender != "all" && gender != "" {
		query = query.Where("Gender = ?", gender)
	}

	offset := int(page-1) * 10
	query = query.Limit(10).Offset(offset)

	if err := query.Find(&products).Error; err != nil {
		return nil, err
	}

	return products, nil
}

func GetCategoryPage(id uint, page uint) (Category, error) {
	var category Category
	var products []*Product

	err := db.Oracle.Where("id=?", id).Find(&category).Error

	if err != nil {
		return Category{}, err
	}

	offset := int(page-1) * 10
	err = db.Oracle.Model(&category).Offset(offset).Limit(10).Association("Products").Find(&products)

	if err != nil {
		return Category{}, err
	}

	category.Products = products

	return category, nil
}

func GetCategories() ([]Category, error) {
	var categories []Category

	err := db.Oracle.Order("name ASC").Find(&categories).Error

	if err != nil {
		return []Category{}, err
	}

	return categories, nil
}
