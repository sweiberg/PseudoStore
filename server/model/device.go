package model

import (
	"gorm.io/gorm"
)

type Device struct {
	gorm.Model

	SessionID string `gorm:"size:255;primaryKey;autoIncrement:false"`
	Type      string `gorm:"size:255;not null" json:"type"`
	Version   string `gorm:"size:255;not null" json:"version"`
	MemberID  uint
}
