package model

import (
	"gorm.io/gorm"
)

type Department struct {
	gorm.Model

	Name  string `gorm:"size:150;not null" json:"name"`
	Flags string `gorm:"size:150;not null" json:"flags"`

	Member []*Member
}
