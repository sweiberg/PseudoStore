package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"pseudo-store/helper"
	"pseudo-store/model"
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
