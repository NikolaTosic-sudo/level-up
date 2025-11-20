package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

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
		fmt.Println("api success")
		ctx.Writer.WriteHeader(http.StatusOK)
		ctx.Writer.Write([]byte("api success"))
	})

	r.Run()
}
