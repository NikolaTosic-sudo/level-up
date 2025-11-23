package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	_ "github.com/NikolaTosic-sudo/level-up/backend/docs"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type TestResponse struct {
	Message string `json:"message"`
}

// @title Your API Title
// @version 1.0
// @description This is a sample API.
// @host localhost:8080
func main() {

	r := gin.Default()
	fmt.Println("started listening on port 8080")

	// Configure CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173"} // Specify allowed origins
	config.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization", "Accept", "User-Agent", "Cache-Control", "Pragma"}
	config.ExposeHeaders = []string{"Content-Length"}
	config.AllowCredentials = true
	config.MaxAge = 12 * time.Hour // Cache preflight requests for 12 hours

	// Apply the CORS middleware
	r.Use(cors.New(config))

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	r.GET("/test", testApi)

	err := r.Run()

	if err != nil {
		log.Println("It broke", err)
	}
}

// @Tags test tag 1
// @Summary testing swagger and api
// @Description test job
// @Produce json
// @Success 200 {object} TestResponse
// @Router /test [get]
func testApi(ctx *gin.Context) {
	response := TestResponse{
		Message: "great job you",
	}

	ctx.JSON(http.StatusOK, response)
}
