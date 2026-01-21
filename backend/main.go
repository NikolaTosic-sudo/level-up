package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	_ "github.com/swaggo/http-swagger/example/go-chi/docs"
	httpSwagger "github.com/swaggo/http-swagger/v2"
)

type TestResponse struct {
	Message string `json:"message"`
}

type TestResponseTwo struct {
	Message string `json:"message"`
}

// @title Your API Title
// @version 1.0
// @description This is a sample API.
// @host localhost:8080
func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Get("/test", testAPI)
	r.Get("/test-two", testAPITwo)

	r.Get("/swagger/*", httpSwagger.Handler(
		httpSwagger.URL("http://localhost:8080/docs/swagger.json"),
	))

	fmt.Println("started listening on port 8080")
	err := http.ListenAndServe(":8080", r)
	if err != nil {
		fmt.Println(err)
	}
}

// @Tags test tag 1
// @Summary testing swagger and api
// @Description test job
// @Produce json
// @Success 200 {object} TestResponse
// @Router /test [get]
func testAPI(w http.ResponseWriter, r *http.Request) {
	res := TestResponse{
		Message: "success",
	}

	response, err := json.Marshal(res)
	if err != nil {
		fmt.Println(err)
	}

	_, err = w.Write(response)
	if err != nil {
		fmt.Println(err)
	}
}

// @Tags test tag 2
// @Summary testing swagger and api
// @Description test job
// @Produce json
// @Success 200 {object} TestResponseTwo
// @Router /test-two [get]
func testAPITwo(w http.ResponseWriter, r *http.Request) {
	res := TestResponseTwo{
		Message: "success Two",
	}

	response, err := json.Marshal(res)
	if err != nil {
		fmt.Println(err)
	}

	_, err = w.Write(response)
	if err != nil {
		fmt.Println(err)
	}
}
