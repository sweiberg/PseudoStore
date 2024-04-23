package model

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"html"
	"pseudo-store/db"
	"strings"
	"time"
)

type Member struct {
	gorm.Model

	ID        uint   `gorm:"primary_key;unique_index:true;auto_increment:true"`
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

func (member *Member) BeforeCreate(*gorm.DB) error {
	pwHash, err := bcrypt.GenerateFromPassword([]byte(member.Password), bcrypt.DefaultCost)

	if err != nil {
		return err
	}

	var lastMember struct{ ID uint }
	err = db.Oracle.Table("members").Last(&lastMember).Error

	if err != nil {
		return err
	}

	member.Password = string(pwHash)
	member.Username = html.EscapeString(strings.TrimSpace(member.Username))
	member.ID = lastMember.ID + 1

	return nil
}

func GetMemberByID(id uint) (Member, error) {
	var member Member

	err := db.Oracle.Where("id=?", id).Find(&member).Error

	if err != nil {
		return Member{}, err
	}

	return member, nil
}

func GetMemberByUsername(username string) (Member, error) {
	var member Member

	err := db.Oracle.Where("username=?", username).Find(&member).Error

	if err != nil {
		return Member{}, err
	}

	return member, nil
}

func (member *Member) AuthorizePassword(password string) error {
	return bcrypt.CompareHashAndPassword([]byte(member.Password), []byte(password))
}
