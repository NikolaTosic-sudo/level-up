package main

import (
	"fmt"
)

type TestResponse struct {
	Message string `json:"message"`
}

// @title Your API Title
// @version 1.0
// @description This is a sample API.
// @host localhost:8080
func main() {
	fmt.Println("started listening on port 8080")
}

// @Tags test tag 1
// @Summary testing swagger and api
// @Description test job
// @Produce json
// @Success 200 {object} TestResponse
// @Router /test [get]
