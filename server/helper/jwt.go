package helper

import (
	"errors"
	"fmt"
	"os"
	"pseudo-store/model"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

var PrivateKey = []byte(os.Getenv("JWT_PRIVATE_KEY"))

func CreateJWT(member model.Member) (string, error) {
	tokenTTL, _ := strconv.Atoi(os.Getenv("TOKEN_TTL"))

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":  member.ID,
		"iat": time.Now().Unix(),
		"eat": time.Now().Add(time.Second * time.Duration(tokenTTL)).Unix(),
	})

	return token.SignedString(PrivateKey)
}

func VerifyHeaderJWT(context *gin.Context) error {
	token, err := GetHeaderJWT(context)

	if err != nil {
		return err
	}

	_, verified := token.Claims.(jwt.MapClaims)

	if verified && token.Valid {
		return nil
	}

	return errors.New("The JWT could not be verified.")
}

func GetHeaderJWT(context *gin.Context) (*jwt.Token, error) {
	bearerJWT := GetBearerJWT(context)

	token, err := jwt.Parse(bearerJWT, func(token *jwt.Token) (interface{}, error) {
		_, signed := token.Method.(*jwt.SigningMethodHMAC)

		if !signed {
			return nil, fmt.Errorf("An error occured with the signing method: %v", token.Header["alg"])
		}

		return PrivateKey, nil
	})

	return token, err
}

func GetBearerJWT(context *gin.Context) string {
	bearer := strings.Split(context.Request.Header.Get("Authorization"), " ")

	if len(bearer) == 2 {
		return bearer[1]
	}

	return ""
}
