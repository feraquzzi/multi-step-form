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

	
	corsHandler := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type", "Authorization"},
	}).Handler(router)

	log.Println("Server is running on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", corsHandler))
}