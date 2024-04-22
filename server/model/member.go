package model

import (
	"gorm.io/gorm"
	"pseudo-store/db"
	"time"
)

type Member struct {
	gorm.Model

	FirstName string `gorm:"size:150;not null" json:"first_name"`
	LastName  string `gorm:"size:150;not null" json:"last_name"`
	Username  string `gorm:"size:150;not null" json:"username"`
	Email     string `gorm:"size:100;not null" json:"email"`
	Password  string `gorm:"size:255;not null;" json:"-"`

	Gender       string    `gorm:"size:100" json:"gender"`
	Municipality string    `gorm:"size:100;not null;" json:"municipality"`
	Country      string    `gorm:"size:100;not null;" json:"country"`
	Birthdate    time.Time `gorm:"not null" json:"birthdate"`
	DepartmentID uint      `gorm:"null" json:"department_id"`

	Department *Department
	Orders     []*Order
	Devices    []*Device
	Payments   []*Payment
}

func (member *Member) Create() (*Member, error) {
	err := db.Oracle.Create(&member).Error

	if err != nil {
		return &Member{}, err
	}

	return member, nil
}
