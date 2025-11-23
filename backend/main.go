package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type TestResponse struct {
	Message string `json:"message"`
}

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

	r.GET("/test", func(ctx *gin.Context) {
		response := TestResponse{
			Message: "great job you",
		}

		ctx.JSON(http.StatusOK, response)
		//
		// err := json.NewEncoder(ctx.Writer).Encode(response)
		//
		// if err != nil {
		// 	fmt.Println("broken encoder", err)
		// }
	})

	err := r.Run()

	if err != nil {
		log.Println("It broke", err)
	}
}
