package controller

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"pseudo-store/db"
	"pseudo-store/helper"
	"pseudo-store/model"
	"time"
)

func Register(context *gin.Context) {
	var register struct {
		FirstName string `json:"first_name"`
		LastName  string `json:"last_name"`
		Username  string `json:"username"`
		Email     string `json:"email"`
		Password  string `json:"password"`

		Gender       string    `json:"gender"`
		Municipality string    `json:"municipality"`
		Country      string    `json:"country"`
		Birthdate    time.Time `json:"birthdate"`
	}

	if err := context.BindJSON(&register); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})

		return
	}

	member := model.Member{
		FirstName:    register.FirstName,
		LastName:     register.LastName,
		Username:     register.Username,
		Email:        register.Email,
		Password:     register.Password,
		Gender:       register.Gender,
		Municipality: register.Municipality,
		Country:      register.Country,
		Birthdate:    register.Birthdate,
	}

	newMember, err := member.Create()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusCreated, gin.H{"member": newMember})
}

func Login(context *gin.Context) {
	var login struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := context.BindJSON(&login); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})

		return
	}

	member, err := model.GetMemberByUsername(login.Username)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	err = member.AuthorizePassword(login.Password)

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

func ViewProfile(context *gin.Context) {
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
	member, err := helper.GetThisMember(context)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	var requestData map[string]interface{}

	if err := json.NewDecoder(context.Request.Body).Decode(&requestData); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse JSON"})

		return
	}

	if password, err := requestData["password"].(string); err {
		if password != "" {
			pwHash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

			if err != nil {
				context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

				return
			}

			requestData["password"] = string(pwHash)
		}
	}

	err = db.Oracle.Model(&member).Updates(requestData).Error

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update member"})

		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Profile updated successfully"})
}
