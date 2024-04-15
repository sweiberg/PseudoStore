package main

import (
	"github.com/cengsin/oracle"
	"gorm.io/gorm"
)

func main() {
	db, err := gorm.Open(oracle.Open("system/oracle@127.0.0.1:1521/XE"), &gorm.Config{})
	if err != nil {
		// panic error or log error info
	}

	// do somethings
}
