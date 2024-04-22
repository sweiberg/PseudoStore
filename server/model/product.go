package model

import (
	"gorm.io/gorm"
	"pseudo-store/db"
)

type Product struct {
	gorm.Model

	Price       float64 `gorm:"type:decimal(10,2);not null" json:"price"`
	Quantity    uint    `gorm:"not null" json:"quantity"`
	Gender      string  `gorm:"size:100" json:"gender"`
	ArticleType string  `gorm:"size:100" json:"article_type"`
	BaseColor   string  `gorm:"size:50" json:"base_color"`
	Season      string  `gorm:"size:25" json:"season"`
	ReleaseYear uint    `json:"release_year"`
	UseType     string  `gorm:"size:100" json:"use_type"`
	Name        string  `gorm:"size:255;not null" json:"name"`
	Description string  `gorm:"type:text;null" json:"description"`
	ImageURL    string  `gorm:"size:255;null" json:"imageURL"`

	CategoryID    uint `gorm:"not null" json:"category_id"`
	SubcategoryID uint `gorm:"not null" json:"subcategory_id"`

	Category    *Category
	Subcategory *Subcategory
	Promotions  []*PromotionMap `gorm:"polymorphic:Poly;polymorphicValue:product"`
}

func GetProductByID(id uint) (Product, error) {
	var product Product

	err := db.Oracle.Preload("Category").Where("id=?", id).Find(&product).Error

	if err != nil {
		return Product{}, err
	}

	return product, nil
}

func GetPopularProducts(limit int) ([]Product, error) {
	var products []Product

	err := db.Oracle.Table("products").
		Select("products.ID, products.Name, products.Price, products.Subcategory_ID, SUM(orders.quantity) AS total_ordered").
		Joins("JOIN orders ON orders.product_ID = products.ID").
		Group("products.ID, products.Name, products.Price, products.Subcategory_ID").
		Order("total_ordered DESC").
		Limit(limit).
		Find(&products).Error

	if err != nil {
		return []Product{}, err
	}

	return products, nil
}
