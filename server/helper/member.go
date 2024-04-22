package helper

import (
	"pseudo-store/model"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func GetThisMemberID(context *gin.Context) (uint, error) {
	err := VerifyHeaderJWT(context)

	if err != nil {
		return 0, err
	}

	token, _ := GetHeaderJWT(context)
	claims, _ := token.Claims.(jwt.MapClaims)
	id := uint(claims["id"].(float64))

	return id, nil
}

func GetThisMember(context *gin.Context) (model.Member, error) {
	id, err := GetThisMemberID(context)

	if err != nil {
		return model.Member{}, err
	}

	user, err := model.GetMemberByID(id)

	if err != nil {
		return model.Member{}, err
	}

	return user, nil
}
