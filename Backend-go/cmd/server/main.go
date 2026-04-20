package main

import (
	"log"
	"multi-step-form-main/api"
	"multi-step-form-main/internal/config"
	"multi-step-form-main/internal/handler"
	"multi-step-form-main/internal/service"
	"net/http"

	_ "github.com/godror/godror"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	config.ConnectDB()
	log.Println("Connected successfully.....")

	userService := service.NewUserService(config.DB)
	userHandler := handler.NewUserHandler(userService)

	router := mux.NewRouter()

	api.RegisterRoutes(router, userHandler)

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type"},
	})

	handlerWithCORS := c.Handler(router)

	log.Println("Server is running on port 8080...")
	log.Fatal(http.ListenAndServe("0.0.0.0:8080", handlerWithCORS))
}
