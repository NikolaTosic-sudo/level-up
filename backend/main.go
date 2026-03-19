package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	_ "github.com/NikolaTosic-sudo/level-up/backend/docs"
	"github.com/NikolaTosic-sudo/level-up/backend/internal/database"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
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

	dbQueries := database.New(db)

	cfg := appConfig{
		database: dbQueries,
	}

	r.Use(middleware.Logger)

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
	}))

	r.Get("/v1/levelup_api/skills", cfg.getSkillsHandler)

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
