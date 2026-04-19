package api

import (
	"multi-step-form-main/internal/handler"

	"github.com/gorilla/mux"
)

func RegisterRoutes(router *mux.Router, userHandler *handler.UserHandler) {
	router.HandleFunc("/api/user", userHandler.GatherUserData).Methods("POST")
}
