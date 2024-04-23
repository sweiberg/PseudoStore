package controller

import (
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"pseudo-store/db"
	"pseudo-store/helper"
	"pseudo-store/model"
	"reflect"
)

func Register(context *gin.Context) {
	var input model.Member

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	member := model.Member{
		FirstName: input.FirstName,
		LastName:  input.LastName,
		Username:  input.Username,
		Email:     input.Email,
		Password:  input.Password,

		Gender:       input.Gender,
		Municipality: input.Municipality,
		Country:      input.Country,
		Birthdate:    input.Birthdate,
	}

	newMember, err := member.Create()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusCreated, gin.H{"member": newMember})
}

func Login(context *gin.Context) {
	var input model.Member

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	member, err := model.GetMemberByUsername(input.Username)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	err = member.AuthorizePassword(input.Password)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	jwt, err := helper.CreateJWT(member)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"jwt": jwt, "member_id": member.ID, "username": member.Username})
}

func Authorize(context *gin.Context) {
	member, err := helper.GetThisMember(context)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"member_id": member.ID, "username": member.Username})
}

func GetProfile(context *gin.Context) {
	id, err := helper.GetThisMemberID(context)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	member, err := model.GetMemberByID(uint(id))

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": member})
}

func EditProfile(context *gin.Context) {
	var input model.Member

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	id, err := helper.GetThisMemberID(context)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	member, err := model.GetMemberByID(uint(id))
	inputValue := reflect.ValueOf(input)

	for i := 0; i < inputValue.NumField(); i++ {
		field := inputValue.Field(i)
		fieldName := inputValue.Type().Field(i).Name
		fieldValue := field.Interface()

		if fieldName == "password" {
			password, ok := fieldValue.(string)

			if !ok {
				context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid password type"})

				return
			}

			hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

			if err != nil {
				context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})

				return
			}

			fieldValue = hashedPassword
		}

		existingValue := reflect.ValueOf(member).FieldByName(fieldName).Interface()

		if !reflect.DeepEqual(fieldValue, reflect.Zero(field.Type()).Interface()) && fieldValue != existingValue {
			reflect.ValueOf(&member).Elem().FieldByName(fieldName).Set(field)
		}
	}

	if err := db.Oracle.Save(&member).Error; err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update member"})

		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Profile updated successfully"})
}
