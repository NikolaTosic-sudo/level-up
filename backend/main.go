package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	_ "github.com/NikolaTosic-sudo/level-up/backend/docs"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	httpSwagger "github.com/swaggo/http-swagger"
)

type TestResponse struct {
	Message string `json:"message"`
}

type TestResponseTwo struct {
	Message string `json:"message"`
}

// @title Level-Up API
// @version 0.1
// @description API for Level-Up app
// @host localhost:8080
func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalln(err)
	}

	r := chi.NewRouter()

	dbURL := os.Getenv("DB_URL")
	port := os.Getenv("PORT")

	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatalln(err)
	}

	fmt.Println(db)

	r.Use(middleware.Logger)
	r.Get("/test", testAPI)
	r.Get("/test-two", testAPITwo)

	r.Get("/swagger/*", httpSwagger.Handler(
		httpSwagger.URL("http://localhost:8080/swagger/doc.json"),
	))

	fullPort := fmt.Sprintf(":%v", port)

	fmt.Println("started listening on port 8080")
	err = http.ListenAndServe(fullPort, r)
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
// @Summary testing swagger and api again
// @Description test job 2
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
